const Get = (req, res) => {
  const { data } = req.body;
  return res.status(200).json({
    status: 'success'
  });
};

const Post = (req, res) => {
  return res.status(200).json({

  })
}