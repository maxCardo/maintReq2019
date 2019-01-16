
const schTemplet = (obj, link) => {
  return{
    subject:`New Service request added for ${obj.property}`,
    body:
    `
    A new service request has been added for ${obj.property}

      Property:  ${obj.property}
      Unit Number:  ${obj.unitNum}
      Resident Name: ${obj.fname} ${obj.lname}
      Resident Phone: ${obj.phone}

      Request Type: ${obj.serviceType}

      Issue Discription: ${obj.serviceDiscription}


      To accept this ticket please schedual using the below link.
      ${link}

    `,
    html:`
      <h4>A new service request has been added for ${obj.property}</h4><br><br>

      <p>Property:  ${obj.property}
      <p>Unit Number:  ${obj.unitNum}
      <p>Resident Name: ${obj.fname} ${obj.lname}
      <p>Resident Phone: ${obj.phone}
      <p>Request Type: ${obj.serviceType}
      <p>Issue Discription: ${obj.serviceDiscription}
      <br>
      <br>
      <p>Accept this ticket and schedual work by clicking  <a href= "http://${link}"> here</a></p>.

    `
  };

};


module.exports = {schTemplet};
