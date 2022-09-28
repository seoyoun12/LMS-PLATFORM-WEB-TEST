export enum businessType {
  PASSENGER = 'PASSENGER', // 여객
  FREIGHT = 'FREIGHT', // 화물
}

export enum businessSubType {
  BUS = 'BUS', //버스
  CHARTER_BUS = 'CHARTER_BUS', //전세버스
  SPECIAL_PASSENGER = 'SPECIAL_PASSENGER', //특수여객
  CORPORATE_TAXI = 'CORPORATE_TAXI', //법인택시
  GENERAL_CARGO = 'GENERAL_CARGO', //일반화물
  PRIVATE_TAXI = 'PRIVATE_TAXI', //개인택시
  INDIVIDUAL_CARGO = 'INDIVIDUAL_CARGO', //개별화물
  CONSIGNMENT = 'CONSIGNMENT', //용달화물
  SPECIAL_TRANSPORTATION = 'SPECIAL_TRANSPORTATION', //특별교통수단
  KNEELING_BUS = 'KNEELING_BUS', //저상버스
  DANGEROUS_GOODS = 'DANGEROUS_GOODS', //위험물
  DESIGNATED_WASTE = 'DESIGNATED_WASTE', //지정폐기물
  HAZARDOUS_CHEMICALS = 'HAZARDOUS_CHEMICALS', //유해화학물질
  HIGH_PRESSURE_GAS_FLAMMABLE = 'HIGH_PRESSURE_GAS_FLAMMABLE', //고압가스(가연성)
  HIGH_PRESSURE_GAS_TOXIC = 'HIGH_PRESSURE_GAS_TOXIC', //고압가스(독성)
}
export const businessTypeReg = [
  { type: businessType.PASSENGER, ko: '여객' },
  { type: businessType.FREIGHT, ko: '화물' },
];

export const businessSubTypeReg = [ // 업종
  { type: businessSubType.BUS, ko: '버스' },
  { type: businessSubType.CHARTER_BUS, ko: '전세버스' },
  { type: businessSubType.SPECIAL_PASSENGER, ko: '특수여객' },
  { type: businessSubType.CORPORATE_TAXI, ko: '법인택시' },
  { type: businessSubType.GENERAL_CARGO, ko: '일반화물' },
  { type: businessSubType.PRIVATE_TAXI, ko: '개인택시' },
  { type: businessSubType.INDIVIDUAL_CARGO, ko: '개별화물' },
  { type: businessSubType.CONSIGNMENT, ko: '용달화물' },
  { type: businessSubType.SPECIAL_TRANSPORTATION, ko: '특별교통수단' },
  { type: businessSubType.KNEELING_BUS, ko: ' 저상버스' },
  { type: businessSubType.DANGEROUS_GOODS, ko: '위험물' },
  { type: businessSubType.DESIGNATED_WASTE, ko: '지정폐기물' },
  { type: businessSubType.HAZARDOUS_CHEMICALS, ko: '유해화학물질' },
  { type: businessSubType.HIGH_PRESSURE_GAS_FLAMMABLE, ko: '고압가스(가연성)' },
  { type: businessSubType.HIGH_PRESSURE_GAS_TOXIC, ko: '고압가스(독성)' },
];

