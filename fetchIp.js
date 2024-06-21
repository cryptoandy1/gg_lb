const fetchIPLB = async () => {
  const res = await fetch('https://storo08.up.railway.app/current')
  const json = await res.json()
  return json
}
export { fetchIPLB }
