export default async (code, mode) => {
  // rules for prettier formatting
  const options = {
    html: {
      printWidth: 100,
      semi: false
    },
    css: {
      printWidth: 100,
      parser: 'postcss'
    },
    js: {
      printWidth: 100
    }
  };

  const dialogflowResponse = await fetch('https://code-formatter.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code, mode, options: options[mode] })
  });

  const body = await dialogflowResponse.json();
  const { formattedCode } = body;
  return formattedCode;
};
