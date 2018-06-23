export default async spokenText => {
  console.log(JSON.stringify({ text: spokenText }));
  const dialogflowResponse = await fetch('https://voice-code.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: spokenText })
  });

  const body = await dialogflowResponse.json();
  console.log('BODY', body);
  const intent = body.intent.displayName;
  const params = body.parameters.fields;
  const normalisedParams = normaliseParams(params);

  return {
    intent,
    params: normalisedParams
  };
};

/*
params looks like 
 {
   tag : {
     stringValue: 'div'
     kind: 'stringValue'
   }
 }

 but we just want it to look like
  {
    tag: 'div'
  }
*/
const normaliseParams = params => {
  return Object.entries(params).map(param => {
    const paramName = param[0];
    const paramType = param[1].kind;
    const paramValue = param[1][paramType];
    return paramValue;
  });
};
