const academicSession = () => {
  const currentYear = new Date().getFullYear()

  const academicSessions = []

  for (let i = currentYear - 8; i <= currentYear; i++) {
    academicSessions.push({ name: `${i}-${i + 1}`, value: `${i}-${i + 1}` })
  }

  return academicSessions
}

export default academicSession