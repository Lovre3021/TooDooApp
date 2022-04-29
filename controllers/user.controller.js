exports.allAccess = (_, res) => {
    res.status(200).send("Public Content.");
  };

exports.userBoard = (_, res) => {
    res.status(200).send("User Content.");
  };
