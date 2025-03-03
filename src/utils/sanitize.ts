export const formFillUpSanitize = (data: any) => {
  const departmentalFee: Record<string, number> = {
    centerFee: Number(data.centerFee),
    association: Number(data.association),
    developmentFee: Number(data.developmentFee),
    amercementFee: Number(data.amercementFee)
  }

  const semesterFee: Record<string, number> = {
    tuitionFee: Number(data.tuitionFee),
    transport: Number(data.transport),
    library: Number(data.library),
    centralSports: Number(data.centralSports),
    studentWelfare: Number(data.studentWelfare),
    treatment: Number(data.treatment),
    roverScout: Number(data.roverScout),
    creditFee: Number(data.creditFee),
    BNCC: Number(data.BNCC),
    computerFee: Number(data.computerFee),
    semesterExamFee: Number(data.semesterExamFee),
    admitCard: Number(data.admitCard),
    othersFee: Number(data.othersFee)
  }

  const residentialFee: Record<string, any> = {
    from: Number(data.from),
    to: data.to,
    fee: data.fee
  }

  const payload: Record<string, any> = {
    departmentalFee,
    semesterFee,
  }

  if (data.fee) {
    payload.residentialFee = residentialFee
  }

  return payload
}


export const retakeFormFillUpSanitize = (data: any) => {
  const departmentalFee: Record<string, number> = {
    centerFee: Number(data.centerFee),
    association: 0,
    developmentFee: 0,
    amercementFee: 0
  }

  const semesterFee: Record<string, number> = {
    tuitionFee: 0,
    transport: 0,
    library: 0,
    centralSports: 0,
    studentWelfare: 0,
    treatment: 0,
    roverScout: 0,
    creditFee: Number(data.creditFee),
    BNCC: 0,
    computerFee: 0,
    semesterExamFee: 0,
    admitCard: Number(data.admitCard),
    othersFee: 0
  }

  const residentialFee: Record<string, any> = {
    from: Number(data.from),
    to: data.to,
    fee: data.fee
  }

  const payload: Record<string, any> = {
    departmentalFee,
    semesterFee,
  }

  if (data.fee) {
    payload.residentialFee = residentialFee
  }

  return payload
}
