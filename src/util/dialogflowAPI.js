const dialogRequest = async (spokenText, mode) => {
  console.log('Request to dialogflow', JSON.stringify({ text: `${spokenText}` }));
  const dialogflowResponse = await fetch('https://voice-code.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: `${spokenText}` })
  });

  const body = await dialogflowResponse.json();
  console.log('Body response from dialogflow', body);
  const intent = body.intent.displayName;
  const params = body.parameters.fields;
  const context = extractContext(body.outputContexts);
  const normalisedParams = normaliseParams(params);

  return {
    intent,
    params: normalisedParams
  };
};

// this sets the context to 'html' in dialogflow
export const init = async () => {
  dialogRequest('switch to html');
};

export default dialogRequest;

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
  let normalisedParams = {};
  Object.entries(params).forEach(param => {
    const paramName = param[0];
    const paramType = param[1].kind;
    const paramValue = param[1][paramType];
    normalisedParams[paramName] = paramValue;
  });

  return normalisedParams;
};

const extractContext = rawContext => {
  return rawContext;
};
