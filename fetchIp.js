const fetchIPLB = async () => {
  const res = await fetch('https://storo08-server.onrender.com/current')
  const json = await res.json()
  return json
}
export { fetchIPLB }
