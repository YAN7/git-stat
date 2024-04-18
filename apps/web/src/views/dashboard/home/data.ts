export const rootData = [
  {
    organizationId: '0001J61000000000A4MD',
    orgUnitId: '11',
    orgUnitName: '中国南方航空集团有限公司',
    parentId: '',
  },
]

export const childData = [
  {
    organizationId: '0001J1100000000NEQU9',
    orgUnitId: '710',
    orgUnitName: '中国南航集团资本控股有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AAE8',
    orgUnitId: '85',
    orgUnitName: '中国南航集团文化传媒股份有限公司',
    parentId: '11',
  },
  {
    organizationId: '1001J61000000000KIGV',
    orgUnitId: '1001',
    orgUnitName: '领导层',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AAKT',
    orgUnitId: '6491',
    orgUnitName: '广州南航建设有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J11000000027BO4S',
    orgUnitId: '811',
    orgUnitName: '广州空港国际物流有限公司',
    parentId: '11',
  },
  {
    organizationId: '1001J61000000000KIHV',
    orgUnitId: '6876',
    orgUnitName: '集团机关离退休人员区',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AAEK',
    orgUnitId: '93',
    orgUnitName: '南航集团广告媒体有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J1100000001D6L2H',
    orgUnitId: '888',
    orgUnitName: '雄安航空公司筹建办公室',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000A5R0',
    orgUnitId: '1187',
    orgUnitName: '中国南航集团物业管理有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AAEE',
    orgUnitId: '89',
    orgUnitName: '中国南航集团地勤有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J610000000000GEU',
    orgUnitId: '12',
    orgUnitName: '中国南方航空股份有限公司',
    parentId: '11',
    isDisabled: true,
  },
  {
    organizationId: '0001J11000000027BO54',
    orgUnitId: '812',
    orgUnitName: '广州白云国际快件中心有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000A5R2',
    orgUnitId: '3008',
    orgUnitName: '中国民用航空大连疗养院',
    parentId: '11',
  },
  {
    organizationId: '0001J1100000000NUJYH',
    orgUnitId: '742',
    orgUnitName: '投资公司',
    parentId: '11',
  },
  {
    organizationId: '1001J1100000002DV8VU',
    orgUnitId: '63087',
    orgUnitName: '纪检监察组',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AADS',
    orgUnitId: '35',
    orgUnitName: '珠海摩天宇航空发动机维修公司',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AADY',
    orgUnitId: '6258',
    orgUnitName: '天源证券经纪有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000000AADQ',
    orgUnitId: '31',
    orgUnitName: '广州南航实业有限公司',
    parentId: '11',
  },
  {
    organizationId: '0001J61000000002RS9J',
    orgUnitId: '60932',
    orgUnitName: '南航国际融资租赁有限公司',
    parentId: '11',
  },
  {
    organizationId: '1001J11000000027YBYD',
    orgUnitId: '62940',
    orgUnitName: '另有任用',
    parentId: '11',
  },
  {
    organizationId: '1001J1100000000EPS3L',
    orgUnitId: '61302',
    orgUnitName: '专职党组巡视组',
    parentId: '11',
  },
]

export const getStaticData = () => [
  {
    ...rootData[0],
    children: JSON.parse(JSON.stringify(childData)),
  },
]

export const getDataApi = (params: { orgUnitId: string } | { keyword: string }) => {
  return new Promise<{ data: typeof rootData }>((resolve) => {
    setTimeout(() => {
      let data: typeof rootData = []
      const allList = [...rootData, ...childData]
      if ('orgUnitId' in params) {
        data = allList.filter((o) => o.parentId === params.orgUnitId)
      } else {
        if (params.keyword) {
          data = allList.filter(
            (o) => o.orgUnitName.includes(params.keyword) || o.orgUnitId.includes(params.keyword),
          )
        } else {
          data = [...rootData]
        }
      }
      resolve({ data })
    }, 200)
  })
}

interface TableRow {
  personName: string
  personId: string
  empId: string
  orgId: string
  pkOrg: string
  pkOrgName: string
  deptName: string
  position?: string | null
}

const personList: TableRow[] = [
  {
    personName: '孟殿原',
    personId: '0001J1100000002N9HP1',
    empId: '275414',
    orgId: '1001J11000000007FRQW',
    pkOrg: '60975',
    pkOrgName: '厦门航空有限公司',
    deptName: '领导层',
    position: null,
  },
  {
    personName: '禚煜',
    personId: '0001J610000000009IX3',
    empId: '180490',
    orgId: '1001J11000000007FRQW',
    pkOrg: '60975',
    pkOrgName: '厦门航空有限公司',
    deptName: '领导层',
    position: '营销总监',
  },
  {
    personName: 'N185408',
    personId: '0001J610000000009K9H',
    empId: '185408',
    orgId: '1001J11000000007FRQW',
    pkOrg: '60975',
    pkOrgName: '厦门航空有限公司',
    deptName: '领导层',
    position: null,
  },
  {
    personName: '登斐然',
    personId: '1001J11000000042XKKE',
    empId: '281305',
    orgId: '1001J11000000007FRQW',
    pkOrg: '60975',
    pkOrgName: '厦门航空有限公司',
    deptName: '领导层',
    position: '副总经理/党委委员',
  },
  {
    personName: 'N607164',
    personId: '0001J610000000002TRZ',
    empId: '607164',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师',
  },
  {
    personName: 'N780995',
    personId: '0001J61000000000314A',
    empId: '780995',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '餐厅服务员',
  },
  {
    personName: 'N782090',
    personId: '0001J6100000000031EO',
    empId: '782090',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师',
  },
  {
    personName: 'N751744',
    personId: '0001J61000000000321J',
    empId: '751744',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师长',
  },
  {
    personName: 'N710966',
    personId: '0001J6100000000032NV',
    empId: '710966',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师',
  },
  {
    personName: 'N725491',
    personId: '0001J6100000000033OE',
    empId: '725491',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师',
  },
  {
    personName: 'N726332',
    personId: '0001J610000000009UUP',
    empId: '726332',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师',
  },
  {
    personName: 'N726340',
    personId: '0001J610000000009UV8',
    empId: '726340',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '厨师',
  },
  {
    personName: 'N778216',
    personId: '0001J610000000009WB7',
    empId: '778216',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '餐厅服务员',
  },
  {
    personName: 'N248448',
    personId: '1001J1100000000WMMRE',
    empId: '248448',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '餐厅服务员',
  },
  {
    personName: 'N248969',
    personId: '1001J1100000000Y9US2',
    empId: '248969',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '餐厅服务员',
  },
  {
    personName: 'N268118',
    personId: '1001J11000000021MWD6',
    empId: '268118',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '仓库保管',
  },
  {
    personName: 'N272695',
    personId: '1001J1100000002C6NBZ',
    empId: '272695',
    orgId: '1001J110000000082H6Q',
    pkOrg: '60980',
    pkOrgName: '航空服务部大连分公司',
    deptName: '空勤餐厅',
    position: '餐厅服务员',
  },
  {
    personName: 'N733716',
    personId: '0001J6100000000030BT',
    empId: '733716',
    orgId: '1001J110000000082H6Z',
    pkOrg: '60981',
    pkOrgName: '航空服务部大连分公司',
    deptName: '地勤餐厅',
    position: '仓库保管',
  },
  {
    personName: 'N771797',
    personId: '0001J6100000000030PG',
    empId: '771797',
    orgId: '1001J110000000082H6Z',
    pkOrg: '60981',
    pkOrgName: '航空服务部大连分公司',
    deptName: '地勤餐厅',
    position: '厨工',
  },
]

export const getTableApi = (params: {
  keyword: string
  treeKeys?: Array<string | number> | string | number
  pageNum: number
  pageSize: number
}) => {
  return new Promise<{ data: TableRow[]; total: number }>((resolve) => {
    const list = params.keyword
      ? personList.filter(
          (o) => o.personName.includes(params.keyword) || o.empId.includes(params.keyword),
        )
      : personList
    const data = list.slice(
      (params.pageNum - 1) * params.pageSize,
      params.pageNum * params.pageSize,
    )
    setTimeout(() => {
      resolve({ data, total: personList.length })
    }, 200)
  })
}
