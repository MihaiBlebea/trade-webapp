
export const checkApiToken = ()=> localStorage.getItem("apiToken") !== null

export const getApiToken = ()=> localStorage.getItem("apiToken")

export const setApiToken = (token)=> localStorage.setItem("apiToken", token)

export const clearApiToken = ()=> localStorage.removeItem("apiToken")