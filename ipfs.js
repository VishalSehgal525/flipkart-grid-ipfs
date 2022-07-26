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

const ipfs = loadIpfs();

const addImage = (imagePath) => {
  if (ipfs == undefined) {
    console.log(`Libaray not imported MONA! Kar kuch. 🌚`);
  }
  if (!imagePath || imagePath.length === 0) {
    console.log("File toh dedo bhai sahab! 🗃");
  }
  const file = imagePath[0];
  const result = await(ipfs).add(file);
  return result;
};
