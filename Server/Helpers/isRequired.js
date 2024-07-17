

export const isRequired = (data, res) => {
    let error = {};
    for (const i of Object.keys(data)) {
      if (data[i] === "" || typeof data[i] === "undefined") error[i] = "Is Required";
    }
    if (Object.keys(error).length > 0)
      return res.status(400, ).json({message: "Invalid Body Parameters",error})
      return true;
  };