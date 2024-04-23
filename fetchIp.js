const fetchIPLB = async () => {
  const res = await fetch('https://twister-races-server.onrender.com/current')
  const json = await res.json()
  return json
}
export { fetchIPLB }
