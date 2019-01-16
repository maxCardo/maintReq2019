
const schTempletPB = (obj, link) => {
  return{
    subject:`New Service request added for ${obj.property}`,
    body:
    `
    A new service request has been added for ${obj.property}

      Property:  ${obj.property}
      Unit Number:  ${obj.unitNum}
      Resident Name: ${obj.name} ${obj.lname}
      Resident Phone: ${obj.phone}

      Request Type: ${obj.serviceType}

      Issue Discription: ${obj.serviceDisc}


      To accept this ticket please schedual using the below link.
      ${link}


    `
  };

};


const schTempletHTML = (obj, link) => {
  return{
    subject:`New Service request added for ${obj.property}`,
    body:
    `
      <h4>A new service request has been added for ${obj.property}</h4><br><br>

      <p>Property:  ${obj.property}
      <p>Unit Number:  ${obj.unitnum}
      <p>Resident Name: ${obj.name}
      <p>Resident Phone: ${obj.phone}
      <br>
      <p>Request Type: ${obj.reqType}
      <br>
      <p>Issue Discription: ${obj.reqDis}
      <br>
      <br>
      <>To accept this ticket please schedual by clicking <a href="${link}">here</a>.
      ${link}
    `
  };

};


module.exports = {schTempletPB, schTempletHTML};
