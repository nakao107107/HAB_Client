<template>
  <div>
    <header class="header">
      <h3 class="app-title">HAB</h3>
    </header>
    <div>
      <nuxt />
    </div>  
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  outline: 0;
}

.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  box-shadow: 0px 2px 3px -3px rgba(0,0,0,0.6);
  z-index: 5;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  
}
</style>
