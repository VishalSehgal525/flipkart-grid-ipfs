async function loadIpfs() {
  const { create, CID, IPFSHTTPClient } = await import("ipfs-http-client");

  let ipfs = IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }
  return ipfs;
}

const fs = require("fs");
const ipfs = loadIpfs();

const addImage = (imagePath) => {
  if (ipfs == undefined) {
    console.log(`Libaray not imported MONA! Kar kuch. 🌚`);
  }
  if (!imagePath || imagePath.length === 0) {
    return console.log("File toh dedo bhai sahab! 🗃");
  }
  const file = imagePath[0];
  const result = await(ipfs).add(file);
  return result;
};

const addFile = (prodName, compName, sName, expDate, dop, prodSerial) => {
  data = {
    productName: prodName,
    companyName: compName,
    serialName: sName,
    expireDate: expDate,
    dateOfPurchase: dop,
    productSerial: prodSerial,
  };
  const file = JSON.stringify(data);
  const result = await(ipfs).add(file);
  return result;
};

const addData = (
  prodName,
  compName,
  sName,
  expDate,
  dop,
  prodSerial,
  imagePath
) => {
  const hash1 = addImage(imagePath);
  const hash2 = addFile(prodName, compName, sName, expDate, dop, prodSerial);
  return [hash1, hash2];
};

module.exports = { addData };
