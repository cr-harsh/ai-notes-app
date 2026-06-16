// POST /api/ai/summarize
export const summarizeNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note content is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "AI API key is not configured on the server",
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following note in 2-3 short sentences:\n\n${content}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error?.message || "Failed to generate summary",
      });
    }

    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      return res.status(500).json({
        success: false,
        message: "AI did not return a summary",
      });
    }

    res.status(200).json({
      success: true,
      summary: summary.trim(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to summarize note",
      error: error.message,
    });
  }
};
