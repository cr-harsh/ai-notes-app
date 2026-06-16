// Example controller — shows how route handlers live in the controllers folder

export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Notes App API is running",
  });
};
