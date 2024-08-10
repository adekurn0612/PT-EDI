function SuccessHandler(req, res, next) {
  console.log("aaa");
  if (res.headersSent) {
    // If headers have already been sent, just call the next middleware
    return next();
  } else if (req.body?.responses) {
    console.log("aaaaaaaaaaaaaaaa");
    res.status(200).json(req.body.responses);
  } else {
    return res.status(500).json({
      data: null,
      meta_data: {
        status: 500,
        message: "Tidak ditemukan response dari server ",
      },
    });
  }
}

export default SuccessHandler;
