export const getScriptName = (dmw: any, chunkName: string, isDevelopment: boolean): string => {
  /* eslint-disable */
  if (isDevelopment && dmw) {
    const jsonWebpackStats = dmw.stats.toJson();
    const { assetsByChunkName } = jsonWebpackStats;
    return assetsByChunkName[chunkName][0];
  }
  return `${chunkName}.js`;
  /* eslint-enable */
};

export const getHtml = (reactHtml: string, state = {}, script: string) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Snake Game</title>
      </head>
      <body>
          <div id="root">${reactHtml}</div>
          <script>
            window.INITIAL_STATE = ${JSON.stringify(state)}
          </script>
          <script src="${script}"></script>
      </body>
      </html>
  `;
};
