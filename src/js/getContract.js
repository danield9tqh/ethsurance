const contractPath = 'http://localhost:8080/contract.json';

const getContract = () => {
  return new Promise((resolve, reject) => {
    function requestListener () {
      const contract = JSON.parse(this.responseText);
      resolve(contract);
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestListener);
    oReq.open("GET", contractPath);
    oReq.send();
  });
};

export default getContract;
