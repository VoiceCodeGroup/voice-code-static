
const state = {
  html = [
    {
      id: "root",
      selfEnding: false,
      startString: '<div>',
      endString: '</div>',
      children: [
        {
          id: "second",
          selfEnding: false,
          startString: '<div>',
          endString: '</div>',
          children: [
            {
              id: "button",
              selfEnding: false,
              startString: '<button>',
              endString: '</div>',
              children: [
                {
                  selfEnding: true,
                  startString: 'buttonText'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
