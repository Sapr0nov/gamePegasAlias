export const getDate = (dateISO: string): string => {
  const startTime = new Date(dateISO)
  if (new Date(Date.now()).getDate() !== new Date(startTime).getDate()) {
    return `${new Date(startTime).getDate()}.${
      new Date(startTime).getMonth() + 1
    }.${new Date(startTime).getFullYear()}`
  } else {
    return `${new Date(startTime).getHours()}:${getMinutes(startTime)}`
  }
}

export const getDateDMY = (dateISO: string): string => {
  const startTime = new Date(dateISO)
  return `${new Date(startTime).getDate()}.${
    new Date(startTime).getMonth() + 1
  }.${new Date(startTime).getFullYear()}`
}

function getMinutes(startTime: Date) {
  if ((new Date(startTime).getMinutes() + '').length === 1) {
    return '0' + new Date(startTime).getMinutes()
  }
  return new Date(startTime).getMinutes()
}
