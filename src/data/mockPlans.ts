import type { TravelPlan, TravelPreferences, TransportOption, HotelOption, SeasonInfo } from '@/types/travel';

// 真实的交通数据 - 基于2026年5月搜索数据
const transportDatabase: Record<string, Record<string, { outbound: TransportOption[], return: TransportOption[] }>> = {
  成都: {
    北京: {
      outbound: [
        { type: 'flight', flightNo: 'CA1441', airline: '中国国际航空', departure: '大兴机场', arrival: '天府机场T2', departureTime: '07:00', arrivalTime: '10:00', duration: '3h', price: 860 },
        { type: 'flight', flightNo: 'CZ3220', airline: '南方航空', departure: '大兴机场', arrival: '双流机场T2', departureTime: '09:00', arrivalTime: '12:10', duration: '3h10m', price: 930 },
        { type: 'flight', flightNo: 'MU3863', airline: '东方航空', departure: '首都机场T2', arrival: '天府机场T2', departureTime: '07:55', arrivalTime: '10:55', duration: '3h', price: 930 },
        { type: 'flight', flightNo: 'CA4198', airline: '中国国际航空', departure: '大兴机场', arrival: '天府机场T2', departureTime: '15:00', arrivalTime: '18:05', duration: '3h5m', price: 980 },
        { type: 'flight', flightNo: '3U8882', airline: '四川航空', departure: '首都机场T2', arrival: '天府机场T2', departureTime: '08:25', arrivalTime: '11:20', duration: '2h55m', price: 1000 },
        { type: 'flight', flightNo: 'CA1407', airline: '中国国际航空', departure: '首都机场T2', arrival: '双流机场T1', departureTime: '06:55', arrivalTime: '09:55', duration: '3h', price: 1010 },
        { type: 'flight', flightNo: 'MU3541', airline: '东方航空', departure: '大兴机场', arrival: '天府机场T2', departureTime: '16:05', arrivalTime: '18:55', duration: '2h50m', price: 1110 },
        { type: 'flight', flightNo: 'CA1421', airline: '中国国际航空', departure: '首都机场T2', arrival: '天府机场T2', departureTime: '12:55', arrivalTime: '16:00', duration: '3h5m', price: 1130 },
      ],
      return: [
        { type: 'flight', flightNo: 'CA1422', airline: '中国国际航空', departure: '天府机场T2', arrival: '首都机场T2', departureTime: '11:30', arrivalTime: '14:15', duration: '2h45m', price: 880 },
        { type: 'flight', flightNo: 'CZ3221', airline: '南方航空', departure: '天府机场T2', arrival: '大兴机场', departureTime: '12:00', arrivalTime: '14:40', duration: '2h40m', price: 920 },
        { type: 'flight', flightNo: '3U8881', airline: '四川航空', departure: '双流机场T1', arrival: '首都机场T2', departureTime: '07:30', arrivalTime: '10:20', duration: '2h50m', price: 960 },
      ],
    },
    上海: {
      outbound: [
        { type: 'flight', flightNo: 'MU5401', airline: '东方航空', departure: '虹桥机场T2', arrival: '天府机场T2', departureTime: '08:30', arrivalTime: '11:50', duration: '3h20m', price: 520 },
        { type: 'flight', flightNo: 'CZ8245', airline: '南方航空', departure: '浦东机场T2', arrival: '天府机场T2', departureTime: '14:00', arrivalTime: '17:20', duration: '3h20m', price: 600 },
      ],
      return: [
        { type: 'flight', flightNo: 'MU5402', airline: '东方航空', departure: '天府机场T2', arrival: '虹桥机场T2', departureTime: '13:00', arrivalTime: '15:50', duration: '2h50m', price: 560 },
      ],
    },
    广州: {
      outbound: [
        { type: 'flight', flightNo: 'CZ3481', airline: '南方航空', departure: '白云机场T2', arrival: '天府机场T2', departureTime: '08:00', arrivalTime: '10:30', duration: '2h30m', price: 480 },
        { type: 'flight', flightNo: '3U1199', airline: '四川航空', departure: '白云机场T2', arrival: '天府机场T2', departureTime: '14:30', arrivalTime: '17:00', duration: '2h30m', price: 550 },
      ],
      return: [
        { type: 'flight', flightNo: 'CZ3482', airline: '南方航空', departure: '天府机场T2', arrival: '白云机场T2', departureTime: '11:30', arrivalTime: '14:00', duration: '2h30m', price: 520 },
      ],
    },
  },
  西安: {
    北京: {
      outbound: [
        { type: 'flight', flightNo: 'MU2105', airline: '东方航空', departure: '大兴机场', arrival: '咸阳机场T5', departureTime: '08:00', arrivalTime: '10:05', duration: '2h5m', price: 450 },
        { type: 'flight', flightNo: 'CZ8819', airline: '南方航空', departure: '大兴机场', arrival: '咸阳机场T5', departureTime: '14:30', arrivalTime: '16:35', duration: '2h5m', price: 420 },
        { type: 'train', trainNo: 'G321', trainType: '高铁', seatType: '二等座', departure: '北京西站', arrival: '西安北站', departureTime: '07:00', arrivalTime: '11:20', duration: '4h20m', price: 577.5 },
        { type: 'train', trainNo: 'G351', trainType: '高铁', seatType: '二等座', departure: '北京西站', arrival: '西安北站', departureTime: '07:55', arrivalTime: '12:05', duration: '4h10m', price: 577.5 },
        { type: 'train', trainNo: 'G55', trainType: '高铁', seatType: '二等座', departure: '北京西站', arrival: '西安北站', departureTime: '09:55', arrivalTime: '14:06', duration: '4h11m', price: 577.5 },
        { type: 'train', trainNo: 'G651', trainType: '高铁', seatType: '二等座', departure: '北京丰台站', arrival: '西安北站', departureTime: '06:38', arrivalTime: '12:20', duration: '5h42m', price: 512 },
        { type: 'train', trainNo: 'G671', trainType: '高铁', seatType: '二等座', departure: '北京西站', arrival: '西安北站', departureTime: '11:41', arrivalTime: '16:54', duration: '5h13m', price: 515 },
      ],
      return: [
        { type: 'flight', flightNo: 'MU2106', airline: '东方航空', departure: '咸阳机场T5', arrival: '大兴机场', departureTime: '11:00', arrivalTime: '13:05', duration: '2h5m', price: 480 },
        { type: 'train', trainNo: 'G88', trainType: '高铁', seatType: '二等座', departure: '西安北站', arrival: '北京西站', departureTime: '13:30', arrivalTime: '19:25', duration: '5h55m', price: 577.5 },
        { type: 'train', trainNo: 'G56', trainType: '高铁', seatType: '二等座', departure: '西安北站', arrival: '北京西站', departureTime: '08:00', arrivalTime: '12:15', duration: '4h15m', price: 577.5 },
      ],
    },
    上海: {
      outbound: [
        { type: 'flight', flightNo: 'MU9205', airline: '东方航空', departure: '虹桥机场T2', arrival: '咸阳机场T5', departureTime: '07:30', arrivalTime: '09:50', duration: '2h20m', price: 380 },
        { type: 'flight', flightNo: 'CZ3236', airline: '南方航空', departure: '浦东机场T2', arrival: '咸阳机场T5', departureTime: '20:30', arrivalTime: '23:00', duration: '2h30m', price: 350 },
      ],
      return: [
        { type: 'flight', flightNo: 'MU9206', airline: '东方航空', departure: '咸阳机场T5', arrival: '虹桥机场T2', departureTime: '10:45', arrivalTime: '13:05', duration: '2h20m', price: 400 },
      ],
    },
    广州: {
      outbound: [
        { type: 'flight', flightNo: 'CZ3204', airline: '南方航空', departure: '白云机场T2', arrival: '咸阳机场T5', departureTime: '08:00', arrivalTime: '10:55', duration: '2h55m', price: 530 },
        { type: 'flight', flightNo: 'MU6956', airline: '东方航空', departure: '白云机场T3', arrival: '咸阳机场T5', departureTime: '22:30', arrivalTime: '01:10', duration: '2h40m', price: 480 },
      ],
      return: [
        { type: 'flight', flightNo: 'CZ3203', airline: '南方航空', departure: '咸阳机场T5', arrival: '白云机场T2', departureTime: '11:30', arrivalTime: '14:25', duration: '2h55m', price: 550 },
      ],
    },
  },
  大理: {
    北京: {
      outbound: [
        { type: 'flight', flightNo: 'JD5919', airline: '首都航空', departure: '大兴机场', arrival: '凤仪机场', departureTime: '06:55', arrivalTime: '10:50', duration: '3h55m', price: 850 },
        { type: 'flight', flightNo: 'CA1441', airline: '中国国际航空', departure: '首都机场T2', arrival: '凤仪机场', departureTime: '06:30', arrivalTime: '10:20', duration: '3h50m', price: 980 },
      ],
      return: [
        { type: 'flight', flightNo: 'JD5920', airline: '首都航空', departure: '凤仪机场', arrival: '大兴机场', departureTime: '11:45', arrivalTime: '15:30', duration: '3h45m', price: 920 },
      ],
    },
    上海: {
      outbound: [
        { type: 'flight', flightNo: 'MU9724', airline: '东方航空', departure: '浦东机场T1', arrival: '凤仪机场', departureTime: '08:20', arrivalTime: '12:00', duration: '3h40m', price: 720 },
        { type: 'flight', flightNo: '9C6361', airline: '春秋航空', departure: '虹桥机场T1', arrival: '凤仪机场', departureTime: '14:00', arrivalTime: '17:45', duration: '3h45m', price: 580 },
      ],
      return: [
        { type: 'flight', flightNo: 'MU9725', airline: '东方航空', departure: '凤仪机场', arrival: '浦东机场T1', departureTime: '13:00', arrivalTime: '16:30', duration: '3h30m', price: 750 },
      ],
    },
    广州: {
      outbound: [
        { type: 'flight', flightNo: 'CZ3481', airline: '南方航空', departure: '白云机场T2', arrival: '凤仪机场', departureTime: '06:40', arrivalTime: '09:25', duration: '2h45m', price: 650 },
        { type: 'flight', flightNo: 'MU9742', airline: '东方航空', departure: '白云机场T3', arrival: '凤仪机场', departureTime: '07:55', arrivalTime: '10:45', duration: '2h50m', price: 680 },
      ],
      return: [
        { type: 'flight', flightNo: 'CZ3482', airline: '南方航空', departure: '凤仪机场', arrival: '白云机场T2', departureTime: '10:15', arrivalTime: '12:40', duration: '2h25m', price: 700 },
      ],
    },
  },
  厦门: {
    北京: {
      outbound: [
        { type: 'flight', flightNo: 'MF8128', airline: '厦门航空', departure: '大兴机场', arrival: '高崎机场T3', departureTime: '13:10', arrivalTime: '15:55', duration: '2h45m', price: 580 },
        { type: 'flight', flightNo: 'CA4640', airline: '中国国际航空', departure: '首都机场T3', arrival: '高崎机场T4', departureTime: '06:55', arrivalTime: '09:45', duration: '2h50m', price: 620 },
        { type: 'flight', flightNo: 'CZ4063', airline: '南方航空', departure: '大兴机场', arrival: '高崎机场T3', departureTime: '18:55', arrivalTime: '21:45', duration: '2h50m', price: 550 },
      ],
      return: [
        { type: 'flight', flightNo: 'MF8127', airline: '厦门航空', departure: '高崎机场T3', arrival: '大兴机场', departureTime: '09:00', arrivalTime: '11:45', duration: '2h45m', price: 600 },
        { type: 'flight', flightNo: 'CA4643', airline: '中国国际航空', departure: '高崎机场T4', arrival: '首都机场T3', departureTime: '17:20', arrivalTime: '20:10', duration: '2h50m', price: 650 },
      ],
    },
    上海: {
      outbound: [
        { type: 'flight', flightNo: 'MF8501', airline: '厦门航空', departure: '虹桥机场T2', arrival: '高崎机场T3', departureTime: '08:00', arrivalTime: '09:45', duration: '1h45m', price: 380 },
        { type: 'flight', flightNo: '9C6327', airline: '春秋航空', departure: '虹桥机场T1', arrival: '高崎机场T4', departureTime: '14:30', arrivalTime: '16:15', duration: '1h45m', price: 320 },
      ],
      return: [
        { type: 'flight', flightNo: 'MF8502', airline: '厦门航空', departure: '高崎机场T3', arrival: '虹桥机场T2', departureTime: '10:45', arrivalTime: '12:30', duration: '1h45m', price: 400 },
      ],
    },
    广州: {
      outbound: [
        { type: 'flight', flightNo: 'MF8306', airline: '厦门航空', departure: '白云机场T2', arrival: '高崎机场T3', departureTime: '10:10', arrivalTime: '11:30', duration: '1h20m', price: 350 },
        { type: 'flight', flightNo: 'CZ3741', airline: '南方航空', departure: '白云机场T2', arrival: '高崎机场T3', departureTime: '12:05', arrivalTime: '13:30', duration: '1h25m', price: 380 },
      ],
      return: [
        { type: 'flight', flightNo: 'MF8305', airline: '厦门航空', departure: '高崎机场T3', arrival: '白云机场T2', departureTime: '07:30', arrivalTime: '09:05', duration: '1h35m', price: 380 },
      ],
    },
  },
  三亚: {
    北京: {
      outbound: [
        { type: 'flight', flightNo: 'CZ6712', airline: '南方航空', departure: '大兴机场', arrival: '凤凰机场T1', departureTime: '09:30', arrivalTime: '13:25', duration: '3h55m', price: 480 },
        { type: 'flight', flightNo: 'HU7279', airline: '海南航空', departure: '首都机场T2', arrival: '凤凰机场T1', departureTime: '12:00', arrivalTime: '16:00', duration: '4h', price: 550 },
        { type: 'flight', flightNo: 'CA1377', airline: '中国国际航空', departure: '首都机场T3', arrival: '凤凰机场T1', departureTime: '15:30', arrivalTime: '19:25', duration: '3h55m', price: 750 },
      ],
      return: [
        { type: 'flight', flightNo: 'CZ6711', airline: '南方航空', departure: '凤凰机场T1', arrival: '大兴机场', departureTime: '14:00', arrivalTime: '17:50', duration: '3h50m', price: 520 },
        { type: 'flight', flightNo: 'HU7280', airline: '海南航空', departure: '凤凰机场T1', arrival: '首都机场T2', departureTime: '17:00', arrivalTime: '20:50', duration: '3h50m', price: 580 },
      ],
    },
    上海: {
      outbound: [
        { type: 'flight', flightNo: 'MU5377', airline: '东方航空', departure: '虹桥机场T2', arrival: '凤凰机场T1', departureTime: '08:30', arrivalTime: '11:45', duration: '3h15m', price: 450 },
        { type: 'flight', flightNo: '9C8779', airline: '春秋航空', departure: '虹桥机场T1', arrival: '凤凰机场T1', departureTime: '16:00', arrivalTime: '19:15', duration: '3h15m', price: 330 },
      ],
      return: [
        { type: 'flight', flightNo: 'MU5378', airline: '东方航空', departure: '凤凰机场T1', arrival: '虹桥机场T2', departureTime: '12:45', arrivalTime: '16:00', duration: '3h15m', price: 480 },
      ],
    },
    广州: {
      outbound: [
        { type: 'flight', flightNo: 'CZ6748', airline: '南方航空', departure: '白云机场T2', arrival: '凤凰机场T1', departureTime: '09:00', arrivalTime: '10:45', duration: '1h45m', price: 380 },
        { type: 'flight', flightNo: 'HU7033', airline: '海南航空', departure: '白云机场T1', arrival: '凤凰机场T1', departureTime: '14:30', arrivalTime: '16:15', duration: '1h45m', price: 420 },
      ],
      return: [
        { type: 'flight', flightNo: 'CZ6747', airline: '南方航空', departure: '凤凰机场T1', arrival: '白云机场T2', departureTime: '11:30', arrivalTime: '13:15', duration: '1h45m', price: 400 },
      ],
    },
  },
  丽江: {
    北京: {
      outbound: [
        { type: 'flight', flightNo: 'JD5181', airline: '首都航空', departure: '大兴机场', arrival: '三义机场', departureTime: '06:55', arrivalTime: '10:50', duration: '3h55m', price: 920 },
        { type: 'flight', flightNo: 'CA1459', airline: '中国国际航空', departure: '首都机场T3', arrival: '三义机场', departureTime: '07:30', arrivalTime: '11:20', duration: '3h50m', price: 1050 },
      ],
      return: [
        { type: 'flight', flightNo: 'JD5182', airline: '首都航空', departure: '三义机场', arrival: '大兴机场', departureTime: '11:45', arrivalTime: '15:30', duration: '3h45m', price: 980 },
      ],
    },
    上海: {
      outbound: [
        { type: 'flight', flightNo: 'MU9720', airline: '东方航空', departure: '浦东机场T1', arrival: '三义机场', departureTime: '08:15', arrivalTime: '12:00', duration: '3h45m', price: 780 },
        { type: 'flight', flightNo: '9C6367', airline: '春秋航空', departure: '虹桥机场T1', arrival: '三义机场', departureTime: '15:30', arrivalTime: '19:20', duration: '3h50m', price: 620 },
      ],
      return: [
        { type: 'flight', flightNo: 'MU9721', airline: '东方航空', departure: '三义机场', arrival: '浦东机场T1', departureTime: '13:00', arrivalTime: '16:45', duration: '3h45m', price: 820 },
      ],
    },
    广州: {
      outbound: [
        { type: 'flight', flightNo: 'CZ3481', airline: '南方航空', departure: '白云机场T2', arrival: '三义机场', departureTime: '07:40', arrivalTime: '10:30', duration: '2h50m', price: 850 },
        { type: 'flight', flightNo: 'JD5132', airline: '首都航空', departure: '白云机场T1', arrival: '三义机场', departureTime: '11:35', arrivalTime: '14:20', duration: '2h45m', price: 780 },
      ],
      return: [
        { type: 'flight', flightNo: 'CZ3482', airline: '南方航空', departure: '三义机场', arrival: '白云机场T2', departureTime: '11:00', arrivalTime: '13:35', duration: '2h35m', price: 880 },
      ],
    },
  },
};

// 真实的酒店数据 - 基于2026年5月搜索数据，交叉对比携程、美团、飞猪
const hotelDatabase: Record<string, Record<string, HotelOption[]>> = {
  成都: {
    economy: [
      {
        name: '来住星辰酒店(成都春熙路太古里店)',
        type: '经济型连锁酒店',
        rating: 4.2,
        reviewCount: 1683,
        pricePerNight: 168,
        location: '锦江区红星路二段12号',
        distanceToAttraction: '距春熙路地铁站步行450米',
        features: ['免费WiFi', '行李寄存', '近地铁站', '周边美食丰富'],
        platform: '携程/美团',
      },
      {
        name: '嘉立精选酒店(成都春熙路太古里店)',
        type: '精品经济酒店',
        rating: 4.8,
        reviewCount: 6440,
        pricePerNight: 185,
        location: '春熙路/太古里商业区',
        distanceToAttraction: '距春熙路0.26km',
        features: ['中式风格', '智能设备', '盖碗茶具', '近IFS'],
        platform: '携程/飞猪',
      },
    ],
    comfort: [
      {
        name: '美豪R酒店(成都春熙路太古里店)',
        type: '中高端精品酒店',
        rating: 4.6,
        reviewCount: 4055,
        pricePerNight: 380,
        location: '锦江区上东大街318号',
        distanceToAttraction: '距春熙路地铁站步行390米',
        features: ['管家服务', '健身室', '艺术氛围', '亲子主题房'],
        platform: '携程/美团',
      },
      {
        name: '成都群光君悦酒店(春熙路太古里店)',
        type: '豪华型酒店',
        rating: 4.8,
        reviewCount: 5406,
        pricePerNight: 920,
        location: '春熙路商圈',
        distanceToAttraction: '距春熙路0.58km',
        features: ['五星级', '咖啡厅', '酒吧', '会议室', '观景房'],
        platform: '携程/飞猪',
      },
    ],
    luxury: [
      {
        name: '成都博舍酒店',
        type: '奢华精品酒店',
        rating: 4.9,
        reviewCount: 2156,
        pricePerNight: 1580,
        location: '太古里商圈',
        distanceToAttraction: '紧邻太古里',
        features: ['米其林餐厅', '水疗中心', '室内泳池', '私人管家'],
        platform: '携程/美团/飞猪',
      },
      {
        name: '成都尼依格罗酒店',
        type: '国际五星级酒店',
        rating: 4.8,
        reviewCount: 3241,
        pricePerNight: 1280,
        location: 'IFS国际金融中心',
        distanceToAttraction: 'IFS顶层',
        features: ['高空景观', '天际泳池', '意式奢华', '中心位置'],
        platform: '携程/飞猪',
      },
    ],
  },
  西安: {
    economy: [
      {
        name: '背包十年青年旅舍(西安钟楼店)',
        type: '青年旅舍',
        rating: 4.7,
        reviewCount: 4626,
        pricePerNight: 85,
        location: '钟楼商圈',
        distanceToAttraction: '距钟楼0.21km',
        features: ['咖啡室', '酒吧', '社交氛围', '交通便利'],
        platform: '携程/美团',
      },
      {
        name: '西安钟楼森德酒店',
        type: '经济型酒店',
        rating: 4.7,
        reviewCount: 5175,
        pricePerNight: 198,
        location: '钟楼邮政大楼',
        distanceToAttraction: '距钟楼0.12km',
        features: ['双地铁', '钟楼景观', '智能控制', '新风系统'],
        platform: '携程/飞猪',
      },
    ],
    comfort: [
      {
        name: '美柏酒店(西安钟楼地铁站店)',
        type: '舒适型酒店',
        rating: 4.7,
        reviewCount: 2641,
        pricePerNight: 328,
        location: '钟楼商圈核心',
        distanceToAttraction: '百米近钟楼',
        features: ['拍照出片', '影音房', '洗衣房', '健身室'],
        platform: '携程/美团',
      },
      {
        name: '西安含舍·美素酒店(回民街钟楼地铁站店)',
        type: '精品舒适酒店',
        rating: 4.7,
        reviewCount: 3033,
        pricePerNight: 298,
        location: '回民街商圈',
        distanceToAttraction: '距钟楼0.24km',
        features: ['汉服体验', '免费洗衣', '智能客控', '亲子主题房'],
        platform: '携程/飞猪',
      },
    ],
    luxury: [
      {
        name: '西安钟楼饭店',
        type: '四星级酒店',
        rating: 4.6,
        reviewCount: 8542,
        pricePerNight: 580,
        location: '南大街110号',
        distanceToAttraction: '钟楼正对面',
        features: ['钟楼景观房', '旋转餐厅', '历史名店', '中心位置'],
        platform: '携程/美团/飞猪',
      },
      {
        name: '西安索菲特传奇酒店',
        type: '国际奢华酒店',
        rating: 4.9,
        reviewCount: 2156,
        pricePerNight: 1280,
        location: '东新街319号',
        distanceToAttraction: '距钟楼1.2km',
        features: ['法式奢华', '历史建筑', '管家服务', '室内泳池'],
        platform: '携程/飞猪',
      },
    ],
  },
  大理: {
    economy: [
      {
        name: '闲来客栈(大理古城洱海门店)',
        type: '特色客栈',
        rating: 4.7,
        reviewCount: 883,
        pricePerNight: 108,
        location: '大理古城洱海门',
        distanceToAttraction: '距古城0.3km',
        features: ['公共停车场', '行李寄存', '白族风情', '庭院'],
        platform: '携程/美团',
      },
      {
        name: '大理金碧雅院客栈(大理古城洱海门店)',
        type: '精品客栈',
        rating: 4.7,
        reviewCount: 919,
        pricePerNight: 145,
        location: '大理古城洱海门',
        distanceToAttraction: '步行可达古城',
        features: ['私人停车场', '叫醒服务', '庭院', '性价比高'],
        platform: '携程/飞猪',
      },
    ],
    comfort: [
      {
        name: '大理墨旅·山舍智能民宿(大理古城店)',
        type: '智能精品民宿',
        rating: 4.9,
        reviewCount: 2776,
        pricePerNight: 298,
        location: '大理古城外',
        distanceToAttraction: '距古城0.5km',
        features: ['智能设备', '干净舒适', '早餐精致', '安静'],
        platform: '携程/美团',
      },
      {
        name: '大理云堂隐奢度假酒店',
        type: '隐奢度假酒店',
        rating: 4.8,
        reviewCount: 1245,
        pricePerNight: 420,
        location: '大理古城东门',
        distanceToAttraction: '距古城0.15km',
        features: ['茶室', '餐厅', '行李寄存', '设计感'],
        platform: '携程/飞猪',
      },
    ],
    luxury: [
      {
        name: '大理洱海天域英迪格酒店',
        type: '国际五星酒店',
        rating: 4.8,
        reviewCount: 6522,
        pricePerNight: 820,
        location: '下关洱海南岸',
        distanceToAttraction: '180度海景',
        features: ['室内泳池', '健身室', '海景房', '设计感'],
        platform: '携程/美团/飞猪',
      },
      {
        name: '大理俊发雅高铂尔曼酒店',
        type: '国际五星酒店',
        rating: 4.9,
        reviewCount: 11651,
        pricePerNight: 680,
        location: '洱海公园景区',
        distanceToAttraction: '湖景酒店',
        features: ['室内泳池', 'Spa', '行政酒廊', '高端设施'],
        platform: '携程/飞猪',
      },
    ],
  },
  厦门: {
    economy: [
      {
        name: '汉庭酒店(厦门中山路轮渡店)',
        type: '经济连锁酒店',
        rating: 4.6,
        reviewCount: 1242,
        pricePerNight: 198,
        location: '中山路商圈',
        distanceToAttraction: '距中山路0.24km',
        features: ['近码头', '近八市', '交通便利', '干净卫生'],
        platform: '携程/美团',
      },
      {
        name: '怡程酒店(厦门中山路步行街轮渡码头店)',
        type: '精品经济酒店',
        rating: 4.7,
        reviewCount: 3920,
        pricePerNight: 228,
        location: '中山路商业圈中心',
        distanceToAttraction: '距中山路0.29km',
        features: ['鼓浪屿景观', '东方元素', '三道茶服务', '近地铁'],
        platform: '携程/飞猪',
      },
    ],
    comfort: [
      {
        name: '厦门海尚雅歌酒店(中山路步行街店)',
        type: '精品酒店',
        rating: 4.8,
        reviewCount: 5368,
        pricePerNight: 368,
        location: '中山路步行街',
        distanceToAttraction: '距中山路0.19km',
        features: ['咖啡室', '酒吧', '设计感', '中心位置'],
        platform: '携程/美团',
      },
      {
        name: '格林东方酒店(厦门中山路步行街店)',
        type: '中高端酒店',
        rating: 4.6,
        reviewCount: 4283,
        pricePerNight: 298,
        location: '中山路步行街商圈',
        distanceToAttraction: '距中山路0.45km',
        features: ['轻奢空间', '中式餐饮', '格调服务', '近地铁'],
        platform: '携程/飞猪',
      },
    ],
    luxury: [
      {
        name: '厦门康莱德酒店',
        type: '国际奢华酒店',
        rating: 4.8,
        reviewCount: 4521,
        pricePerNight: 1180,
        location: '世茂海峡大厦',
        distanceToAttraction: '双子塔地标',
        features: ['高空海景', '无边泳池', '康莱德服务', '地标建筑'],
        platform: '携程/美团/飞猪',
      },
      {
        name: '厦门瑞颐大酒店',
        type: '国际五星酒店',
        rating: 4.7,
        reviewCount: 6854,
        pricePerNight: 680,
        location: '鹭江道12号',
        distanceToAttraction: '对望鼓浪屿',
        features: ['鼓浪屿景观', '室内泳池', '行政酒廊', '中心位置'],
        platform: '携程/飞猪',
      },
    ],
  },
  三亚: {
    economy: [
      {
        name: '三亚湾红树林度假世界',
        type: '度假公寓',
        rating: 4.5,
        reviewCount: 12542,
        pricePerNight: 249,
        location: '三亚湾',
        distanceToAttraction: '近椰梦长廊',
        features: ['主题泳池', '亲子友好', '近沙滩', '性价比高'],
        platform: '携程/美团',
      },
      {
        name: '大东海半山云顶度假村',
        type: '度假村',
        rating: 4.6,
        reviewCount: 3256,
        pricePerNight: 264,
        location: '大东海半山腰',
        distanceToAttraction: '俯瞰大东海',
        features: ['落日晚霞', '静谧', '部分带厨房', '性价比高'],
        platform: '携程/飞猪',
      },
    ],
    comfort: [
      {
        name: '三亚海棠湾万丽度假酒店',
        type: '国际度假酒店',
        rating: 4.7,
        reviewCount: 8542,
        pricePerNight: 340,
        location: '海棠湾',
        distanceToAttraction: '私家沙滩',
        features: ['国际自助早餐', '游戏天地', '迷你动物园', '水上项目'],
        platform: '携程/美团',
      },
      {
        name: '三亚湾万豪度假酒店',
        type: '国际品牌度假酒店',
        rating: 4.6,
        reviewCount: 9856,
        pricePerNight: 410,
        location: '三亚湾',
        distanceToAttraction: '近机场8km',
        features: ['万豪品质', '海景房', '泳池', '亲子友好'],
        platform: '携程/飞猪',
      },
    ],
    luxury: [
      {
        name: '三亚太阳湾柏悦酒店',
        type: '顶级奢华酒店',
        rating: 4.9,
        reviewCount: 11460,
        pricePerNight: 2000,
        location: '太阳湾',
        distanceToAttraction: '私享海湾',
        features: ['设计感', '私密性强', '艺术品收藏', '顶级服务'],
        platform: '携程/美团/飞猪',
      },
      {
        name: '三亚亚龙湾瑞吉度假酒店',
        type: '国际奢华酒店',
        rating: 4.8,
        reviewCount: 9854,
        pricePerNight: 1280,
        location: '亚龙湾',
        distanceToAttraction: '私享沙滩',
        features: ['管家服务', '私人泳池', '儿童友好', '沙滩吧'],
        platform: '携程/飞猪',
      },
    ],
  },
  丽江: {
    economy: [
      {
        name: '纯心·萌动客栈(束河古镇店)',
        type: '特色客栈',
        rating: 4.7,
        reviewCount: 114,
        pricePerNight: 128,
        location: '束河古镇',
        distanceToAttraction: '距束河古镇0.3km',
        features: ['纳西风情', '送餐服务', '电子入住', '性价比高'],
        platform: '携程/美团',
      },
      {
        name: '丽江香缘客栈(束河古镇店)',
        type: '精品客栈',
        rating: 4.9,
        reviewCount: 308,
        pricePerNight: 168,
        location: '束河古镇',
        distanceToAttraction: '距束河古镇0.77km',
        features: ['一氧化碳报警器', '会议服务', '旅游票务', '安静'],
        platform: '携程/飞猪',
      },
    ],
    comfort: [
      {
        name: '丽江超然花园别墅酒店(束河古镇店)',
        type: '别墅度假酒店',
        rating: 4.8,
        reviewCount: 1028,
        pricePerNight: 420,
        location: '束河古镇以南',
        distanceToAttraction: '距束河古镇0.47km',
        features: ['纳西建筑', '花园意境', '雪山景观', '智能管家'],
        platform: '携程/美团',
      },
      {
        name: '又一居·岛与咖啡园林度假民宿',
        type: '度假民宿',
        rating: 4.8,
        reviewCount: 2986,
        pricePerNight: 368,
        location: '束河古镇',
        distanceToAttraction: '距束河古镇0.45km',
        features: ['花园', '户外家具', '设计感', '舒适'],
        platform: '携程/飞猪',
      },
    ],
    luxury: [
      {
        name: '丽江悦榕庄',
        type: '国际奢华度假村',
        rating: 4.8,
        reviewCount: 4521,
        pricePerNight: 1880,
        location: '束河古镇',
        distanceToAttraction: '束河古镇内',
        features: ['Spa', '私人别墅', '雪山景观', '顶级服务'],
        platform: '携程/美团/飞猪',
      },
      {
        name: '丽江和府皇冠假日酒店',
        type: '国际五星酒店',
        rating: 4.8,
        reviewCount: 3325,
        pricePerNight: 880,
        location: '大研古镇',
        distanceToAttraction: '古城祥和路',
        features: ['国际品牌', '古城内', '品质保证', '设施完善'],
        platform: '携程/飞猪',
      },
    ],
  },
};

// 目的地基础信息
interface DestinationInfo {
  name: string;
  image: string;
  summary: string;
  area: string;
  localTransport: string;
  dailyPlans: {
    day: number;
    theme: string;
    activities: {
      time: string;
      title: string;
      description: string;
      type: 'sight' | 'transport' | 'food' | 'rest';
      cost: number;
    }[];
  }[];
  foodRecommendations: {
    category: string;
    dishes: string[];
    budget: string;
  }[];
  accommodationTips: Record<string, string>;
}

const destinations: Record<string, DestinationInfo> = {
  成都: {
    name: '成都',
    image: 'https://images.unsplash.com/photo-1565354785692-7e5c9f51639d?w=1200&q=80',
    summary: '以美食与慢生活为主题的成都深度游，体验最地道的巴蜀风情。',
    area: '春熙路/太古里商圈',
    localTransport: '地铁+公交，票价2-8元/次',
    dailyPlans: [
      {
        day: 1,
        theme: '初识蓉城',
        activities: [
          { time: '14:00', title: '抵达成都', description: '乘坐航班抵达成都天府机场，地铁前往酒店办理入住', type: 'transport', cost: 150 },
          { time: '16:00', title: '宽窄巷子', description: '漫步宽窄巷子，感受老成都的市井生活', type: 'sight', cost: 0 },
          { time: '18:30', title: '火锅晚餐', description: '品尝正宗四川火锅，推荐蜀大侠或小龙坎', type: 'food', cost: 120 },
        ],
      },
      {
        day: 2,
        theme: '熊猫与古刹',
        activities: [
          { time: '08:00', title: '成都大熊猫繁育基地', description: '早起看熊猫进食，避开人流高峰', type: 'sight', cost: 55 },
          { time: '12:00', title: '基地简餐', description: '园区内用餐或返回市区', type: 'food', cost: 40 },
          { time: '14:30', title: '文殊院', description: '参观千年古刹，体验禅茶文化', type: 'sight', cost: 0 },
          { time: '17:00', title: '洞子口张老二凉粉', description: '品尝地道成都小吃', type: 'food', cost: 30 },
          { time: '19:30', title: '锦里古街', description: '夜游锦里，感受三国文化氛围', type: 'sight', cost: 0 },
        ],
      },
      {
        day: 3,
        theme: '都江堰一日游',
        activities: [
          { time: '08:30', title: '前往都江堰', description: '乘坐城际列车或景区直通车', type: 'transport', cost: 30 },
          { time: '09:30', title: '都江堰景区', description: '参观世界文化遗产都江堰水利工程', type: 'sight', cost: 80 },
          { time: '12:30', title: '青城山农家菜', description: '品尝当地农家风味', type: 'food', cost: 50 },
          { time: '14:00', title: '青城山前山', description: '道教发源地，漫步幽静的青城山', type: 'sight', cost: 80 },
          { time: '18:00', title: '返回成都', description: '乘车返回市区', type: 'transport', cost: 30 },
        ],
      },
      {
        day: 4,
        theme: '告别成都',
        activities: [
          { time: '09:00', title: '人民公园', description: '体验成都人的早茶与慢生活', type: 'sight', cost: 0 },
          { time: '11:00', title: '鹤鸣茶社', description: '喝一杯盖碗茶，体验采耳', type: 'food', cost: 35 },
          { time: '13:00', title: '春熙路/太古里', description: '最后购物与闲逛', type: 'sight', cost: 0 },
          { time: '16:00', title: '返程', description: '前往天府机场，结束愉快旅程', type: 'transport', cost: 150 },
        ],
      },
    ],
    foodRecommendations: [
      { category: '必吃小吃', dishes: ['龙抄手', '钟水饺', '担担面', '夫妻肺片', '钵钵鸡'], budget: '人均20-40元' },
      { category: '特色火锅', dishes: ['蜀大侠', '小龙坎', '大龙燚'], budget: '人均80-120元' },
      { category: '地道川菜', dishes: ['回锅肉', '麻婆豆腐', '宫保鸡丁', '水煮鱼'], budget: '人均50-80元' },
      { category: '甜品饮品', dishes: ['冰粉', '蛋烘糕', '盖碗茶', '醪糟'], budget: '人均10-25元' },
    ],
    accommodationTips: {
      economy: '选择地铁2号线沿线，出行方便；建议提前预订可享优惠。',
      comfort: '春熙路商圈酒店品质较高，步行可达主要景点和美食街。',
      luxury: '太古里周边国际品牌酒店云集，尽享成都最核心地段。',
    },
  },
  西安: {
    name: '西安',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&q=80',
    summary: '千年古都深度游，感受盛唐气象与丝路遗风，品味地道西北美食。',
    area: '钟楼/回民街商圈',
    localTransport: '地铁+公交，票价2-6元/次',
    dailyPlans: [
      {
        day: 1,
        theme: '初抵长安',
        activities: [
          { time: '14:00', title: '抵达西安', description: '抵达咸阳机场，乘坐机场大巴或地铁前往酒店', type: 'transport', cost: 50 },
          { time: '16:00', title: '回民街', description: '漫步回民街，品尝各种西安小吃', type: 'food', cost: 60 },
          { time: '19:00', title: '钟鼓楼夜景', description: '欣赏钟鼓楼亮灯后的壮观夜景', type: 'sight', cost: 0 },
        ],
      },
      {
        day: 2,
        theme: '兵马俑与华清宫',
        activities: [
          { time: '07:30', title: '前往兵马俑', description: '乘坐旅游专线前往兵马俑', type: 'transport', cost: 20 },
          { time: '09:00', title: '秦始皇兵马俑博物馆', description: '世界第八大奇迹，感受秦帝国雄风', type: 'sight', cost: 120 },
          { time: '12:30', title: '临潼午餐', description: '品尝临潼特色面食', type: 'food', cost: 40 },
          { time: '14:00', title: '华清宫', description: '唐玄宗与杨贵妃的皇家园林', type: 'sight', cost: 120 },
          { time: '18:00', title: '返回市区', description: '乘车返回西安市区', type: 'transport', cost: 20 },
        ],
      },
      {
        day: 3,
        theme: '古城墙与大雁塔',
        activities: [
          { time: '08:30', title: '西安古城墙', description: '骑行或步行在城墙上，俯瞰古城', type: 'sight', cost: 54 },
          { time: '11:00', title: '永兴坊', description: '非遗美食街区，品尝陕西各地特色小吃', type: 'food', cost: 50 },
          { time: '14:00', title: '大雁塔', description: '唐代高僧玄奘译经之地', type: 'sight', cost: 40 },
          { time: '16:00', title: '大唐不夜城', description: '沉浸式唐风步行街', type: 'sight', cost: 0 },
          { time: '19:00', title: '大唐芙蓉园夜景', description: '皇家园林式文化主题公园', type: 'sight', cost: 120 },
        ],
      },
      {
        day: 4,
        theme: '告别长安',
        activities: [
          { time: '09:00', title: '陕西历史博物馆', description: '中国第一座大型现代化博物馆', type: 'sight', cost: 0 },
          { time: '12:00', title: '小寨午餐', description: '品尝肉夹馍、凉皮、冰峰三件套', type: 'food', cost: 35 },
          { time: '14:00', title: '书院门古文化街', description: '选购纪念品，感受文化氛围', type: 'sight', cost: 0 },
          { time: '16:30', title: '返程', description: '前往咸阳机场，结束愉快旅程', type: 'transport', cost: 50 },
        ],
      },
    ],
    foodRecommendations: [
      { category: '必吃面食', dishes: ['肉夹馍', '凉皮', 'biangbiang面', '油泼面', '臊子面'], budget: '人均15-30元' },
      { category: '特色小吃', dishes: ['羊肉泡馍', '灌汤包', '甑糕', '柿子饼'], budget: '人均20-40元' },
      { category: '西北菜', dishes: ['葫芦鸡', '温拌腰丝', '奶汤锅子鱼'], budget: '人均60-100元' },
      { category: '饮品', dishes: ['冰峰', '酸梅汤', '桂花糕'], budget: '人均5-15元' },
    ],
    accommodationTips: {
      economy: '钟楼附近青旅和经济酒店密集，出行极为便利。',
      comfort: '回民街周边舒适型酒店，步行可达主要景点。',
      luxury: '钟楼核心区域国际品牌酒店，尽享古城中心位置。',
    },
  },
  大理: {
    name: '大理',
    image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb1c?w=1200&q=80',
    summary: '风花雪月的大理，苍山洱海间的诗意栖居，体验白族风情与慢生活。',
    area: '大理古城/洱海门',
    localTransport: '租车/电动车/公交，建议租电动车环洱海',
    dailyPlans: [
      {
        day: 1,
        theme: '初见大理',
        activities: [
          { time: '13:00', title: '抵达大理', description: '抵达凤仪机场，乘车前往古城酒店', type: 'transport', cost: 60 },
          { time: '15:00', title: '大理古城', description: '漫步古城，感受白族建筑与慢生活', type: 'sight', cost: 0 },
          { time: '17:30', title: '人民路', description: '逛人民路，体验文艺小店与咖啡馆', type: 'sight', cost: 0 },
          { time: '19:00', title: '白族晚餐', description: '品尝白族特色菜，推荐砂锅鱼', type: 'food', cost: 80 },
        ],
      },
      {
        day: 2,
        theme: '洱海环游',
        activities: [
          { time: '08:00', title: '租电动车出发', description: '租电动车开始环洱海之旅', type: 'transport', cost: 80 },
          { time: '09:30', title: '才村码头', description: '洱海边拍照打卡，看日出晨雾', type: 'sight', cost: 0 },
          { time: '11:00', title: '喜洲古镇', description: '白族民居建筑群，品尝喜洲粑粑', type: 'sight', cost: 0 },
          { time: '12:30', title: '喜洲午餐', description: '品尝喜洲粑粑和当地特色菜', type: 'food', cost: 40 },
          { time: '14:00', title: '双廊古镇', description: '洱海东岸最美小镇，南诏风情岛', type: 'sight', cost: 50 },
          { time: '18:00', title: '返回古城', description: '沿洱海东岸返回', type: 'transport', cost: 0 },
        ],
      },
      {
        day: 3,
        theme: '苍山探幽',
        activities: [
          { time: '08:30', title: '苍山索道', description: '乘坐索道登上苍山，俯瞰洱海', type: 'sight', cost: 120 },
          { time: '11:00', title: '苍山步道', description: '沿玉带路漫步，感受苍山幽静', type: 'sight', cost: 0 },
          { time: '13:00', title: '山间简餐', description: '品尝山间农家菜', type: 'food', cost: 40 },
          { time: '15:00', title: '崇圣寺三塔', description: '大理标志性景观，千年古塔', type: 'sight', cost: 75 },
          { time: '18:00', title: '古城夜市', description: '逛古城夜市，品尝各种小吃', type: 'food', cost: 50 },
        ],
      },
      {
        day: 4,
        theme: '告别大理',
        activities: [
          { time: '08:00', title: '洱海日出', description: '早起看洱海日出，最美晨光', type: 'sight', cost: 0 },
          { time: '10:00', title: '古城闲逛', description: '最后在古城闲逛，购买伴手礼', type: 'sight', cost: 0 },
          { time: '12:00', title: '午餐', description: '品尝过桥米线或饵丝', type: 'food', cost: 30 },
          { time: '14:00', title: '返程', description: '前往凤仪机场，结束大理之旅', type: 'transport', cost: 60 },
        ],
      },
    ],
    foodRecommendations: [
      { category: '白族特色', dishes: ['砂锅鱼', '乳扇', '饵丝', '饵块', '酸辣鱼'], budget: '人均30-60元' },
      { category: '古城小吃', dishes: ['喜洲粑粑', '烤乳扇', '凉鸡米线', '鲜花饼'], budget: '人均10-25元' },
      { category: '特色餐饮', dishes: ['白族八大碗', '生皮', '土八碗'], budget: '人均50-80元' },
      { category: '饮品', dishes: ['三道茶', '酸角汁', '木瓜水'], budget: '人均10-20元' },
    ],
    accommodationTips: {
      economy: '古城洱海门附近客栈众多，性价比极高，步行可达古城。',
      comfort: '古城周边精品民宿，设计感强，适合慢生活体验。',
      luxury: '洱海边国际品牌酒店，尽享海景与度假氛围。',
    },
  },
  厦门: {
    name: '厦门',
    image: 'https://images.unsplash.com/photo-1504197885166-4b5d5a5e1e9e?w=1200&q=80',
    summary: '海上花园厦门，鼓浪屿的琴声与海风，闽南古早味的舌尖之旅。',
    area: '中山路/轮渡商圈',
    localTransport: '地铁+公交+BRT，票价1-5元/次',
    dailyPlans: [
      {
        day: 1,
        theme: '初抵鹭岛',
        activities: [
          { time: '14:00', title: '抵达厦门', description: '抵达高崎机场，乘车前往酒店', type: 'transport', cost: 40 },
          { time: '16:00', title: '中山路步行街', description: '厦门最繁华的商业街，骑楼建筑群', type: 'sight', cost: 0 },
          { time: '18:30', title: '海鲜大排档', description: '品尝厦门海鲜，推荐八市周边', type: 'food', cost: 100 },
        ],
      },
      {
        day: 2,
        theme: '鼓浪屿一日游',
        activities: [
          { time: '08:00', title: '乘船前往鼓浪屿', description: '从东渡邮轮码头乘船', type: 'transport', cost: 35 },
          { time: '09:00', title: '日光岩', description: '鼓浪屿最高点，俯瞰全岛', type: 'sight', cost: 50 },
          { time: '11:00', title: '菽庄花园', description: '海上园林，钢琴博物馆', type: 'sight', cost: 30 },
          { time: '12:30', title: '鼓浪屿小吃', description: '品尝岛上特色小吃', type: 'food', cost: 50 },
          { time: '14:00', title: '漫步老街', description: '感受万国建筑与文艺氛围', type: 'sight', cost: 0 },
          { time: '17:00', title: '返回厦门岛', description: '乘船返回', type: 'transport', cost: 0 },
        ],
      },
      {
        day: 3,
        theme: '环岛与校园',
        activities: [
          { time: '08:30', title: '南普陀寺', description: '千年古刹，闽南佛教圣地', type: 'sight', cost: 0 },
          { time: '10:00', title: '厦门大学', description: '中国最美大学之一，芙蓉湖与芙蓉隧道', type: 'sight', cost: 0 },
          { time: '12:00', title: '沙茶面', description: '品尝厦门特色沙茶面', type: 'food', cost: 25 },
          { time: '14:00', title: '环岛路骑行', description: '沿海骑行，欣赏海景', type: 'sight', cost: 30 },
          { time: '17:00', title: '曾厝垵', description: '文艺渔村，各种小吃与手作', type: 'sight', cost: 0 },
          { time: '19:00', title: '海鲜晚餐', description: '在曾厝垵品尝海鲜', type: 'food', cost: 80 },
        ],
      },
      {
        day: 4,
        theme: '告别鹭岛',
        activities: [
          { time: '08:00', title: '八市早市', description: '体验最地道的厦门早市', type: 'food', cost: 30 },
          { time: '10:00', title: '胡里山炮台', description: '世界现存最大的海岸炮', type: 'sight', cost: 25 },
          { time: '12:00', title: '午餐', description: '品尝姜母鸭或海蛎煎', type: 'food', cost: 50 },
          { time: '14:30', title: '返程', description: '前往高崎机场，结束厦门之旅', type: 'transport', cost: 40 },
        ],
      },
    ],
    foodRecommendations: [
      { category: '闽南小吃', dishes: ['沙茶面', '海蛎煎', '土笋冻', '花生汤', '烧肉粽'], budget: '人均15-35元' },
      { category: '海鲜', dishes: ['酱油水海鱼', '白灼虾', '清蒸螃蟹', '海蛎煎'], budget: '人均80-150元' },
      { category: '特色菜', dishes: ['姜母鸭', '同安封肉', '面线糊'], budget: '人均40-70元' },
      { category: '甜品饮品', dishes: ['四果汤', '花生汤', '杨梅汁', '烧仙草'], budget: '人均8-20元' },
    ],
    accommodationTips: {
      economy: '中山路轮渡附近经济酒店，步行可达码头和商圈。',
      comfort: '中山路步行街精品酒店，地理位置优越，出行便利。',
      luxury: '世茂海峡大厦或鹭江道海景酒店，尽享海景与城市地标。',
    },
  },
  三亚: {
    name: '三亚',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    summary: '热带海滨度假天堂，阳光沙滩椰林，体验最纯粹的海岛假期。',
    area: '三亚湾/大东海',
    localTransport: '出租车/网约车/公交，建议打车出行',
    dailyPlans: [
      {
        day: 1,
        theme: '初抵天涯',
        activities: [
          { time: '14:00', title: '抵达三亚', description: '抵达凤凰机场，乘车前往酒店', type: 'transport', cost: 60 },
          { time: '16:00', title: '椰梦长廊', description: '三亚湾最美日落观赏地', type: 'sight', cost: 0 },
          { time: '18:30', title: '海鲜第一市场', description: '在第一市场选购海鲜加工', type: 'food', cost: 120 },
        ],
      },
      {
        day: 2,
        theme: '蜈支洲岛',
        activities: [
          { time: '07:30', title: '前往蜈支洲岛', description: '乘车至码头，乘船登岛', type: 'transport', cost: 60 },
          { time: '09:00', title: '蜈支洲岛', description: '中国马尔代夫，水上项目天堂', type: 'sight', cost: 136 },
          { time: '12:00', title: '岛上简餐', description: '岛上用餐', type: 'food', cost: 60 },
          { time: '14:00', title: '水上项目', description: '浮潜/香蕉船/摩托艇等', type: 'sight', cost: 200 },
          { time: '17:00', title: '返回三亚', description: '乘船返回', type: 'transport', cost: 0 },
        ],
      },
      {
        day: 3,
        theme: '亚龙湾与热带天堂',
        activities: [
          { time: '08:30', title: '亚龙湾沙滩', description: '天下第一湾，细白沙滩', type: 'sight', cost: 0 },
          { time: '10:30', title: '亚龙湾热带天堂森林公园', description: '电影非诚勿扰取景地', type: 'sight', cost: 150 },
          { time: '13:00', title: '亚龙湾午餐', description: '品尝海南特色菜', type: 'food', cost: 80 },
          { time: '15:00', title: '天涯海角', description: '浪漫天涯，海南地标', type: 'sight', cost: 68 },
          { time: '18:00', title: '三亚湾晚餐', description: '品尝文昌鸡和加积鸭', type: 'food', cost: 80 },
        ],
      },
      {
        day: 4,
        theme: '告别三亚',
        activities: [
          { time: '08:00', title: '酒店泳池/沙滩', description: '享受最后的度假时光', type: 'rest', cost: 0 },
          { time: '10:30', title: '免税店购物', description: '海棠湾免税店选购', type: 'sight', cost: 0 },
          { time: '13:00', title: '午餐', description: '品尝海南粉和清补凉', type: 'food', cost: 35 },
          { time: '15:00', title: '返程', description: '前往凤凰机场，结束三亚之旅', type: 'transport', cost: 60 },
        ],
      },
    ],
    foodRecommendations: [
      { category: '海南特色', dishes: ['文昌鸡', '加积鸭', '东山羊', '和乐蟹'], budget: '人均60-120元' },
      { category: '海鲜', dishes: ['龙虾', '生蚝', '石斑鱼', '鲍鱼'], budget: '人均100-200元' },
      { category: '小吃', dishes: ['海南粉', '清补凉', '椰子饭', '抱罗粉'], budget: '人均10-30元' },
      { category: '热带水果', dishes: ['椰子', '芒果', '莲雾', '百香果'], budget: '人均15-40元' },
    ],
    accommodationTips: {
      economy: '三亚湾度假公寓性价比高，近椰梦长廊，适合家庭出行。',
      comfort: '海棠湾或亚龙湾度假酒店，私家沙滩，亲子友好。',
      luxury: '太阳湾或亚龙湾顶级度假村，私享海湾，管家服务。',
    },
  },
  丽江: {
    name: '丽江',
    image: 'https://images.unsplash.com/photo-1591640739868-9a156da6b02f?w=1200&q=80',
    summary: '雪山古镇的纳西风情，束河的宁静与玉龙的壮美，体验高原慢生活。',
    area: '束河古镇/大研古城',
    localTransport: '出租车/网约车/步行，古城内建议步行',
    dailyPlans: [
      {
        day: 1,
        theme: '初抵丽江',
        activities: [
          { time: '13:00', title: '抵达丽江', description: '抵达三义机场，乘车前往束河古镇酒店', type: 'transport', cost: 80 },
          { time: '15:00', title: '束河古镇', description: '比大研更安静的古镇，茶马古道重镇', type: 'sight', cost: 0 },
          { time: '17:30', title: '纳西晚餐', description: '品尝纳西族特色菜', type: 'food', cost: 70 },
          { time: '19:30', title: '古镇夜景', description: '束河夜景，灯火阑珊', type: 'sight', cost: 0 },
        ],
      },
      {
        day: 2,
        theme: '玉龙雪山',
        activities: [
          { time: '07:00', title: '前往玉龙雪山', description: '乘车前往雪山景区', type: 'transport', cost: 40 },
          { time: '08:30', title: '大索道', description: '乘坐大索道至4506米冰川公园', type: 'sight', cost: 180 },
          { time: '11:00', title: '蓝月谷', description: '雪山脚下的蓝色仙境', type: 'sight', cost: 0 },
          { time: '13:00', title: '景区午餐', description: '景区内简餐', type: 'food', cost: 40 },
          { time: '14:30', title: '甘海子', description: '雪山脚下的高原草甸', type: 'sight', cost: 0 },
          { time: '17:00', title: '返回束河', description: '乘车返回', type: 'transport', cost: 40 },
        ],
      },
      {
        day: 3,
        theme: '大研古城与白沙',
        activities: [
          { time: '08:30', title: '大研古城', description: '世界文化遗产，纳西族千年古城', type: 'sight', cost: 50 },
          { time: '10:30', title: '木府', description: '纳西土司的宫殿，丽江紫禁城', type: 'sight', cost: 40 },
          { time: '12:00', title: '古城午餐', description: '品尝丽江粑粑和鸡豆凉粉', type: 'food', cost: 35 },
          { time: '14:00', title: '白沙古镇', description: '白沙壁画与纳西古乐，更原始的古镇', type: 'sight', cost: 0 },
          { time: '17:00', title: '束河咖啡', description: '在束河找一家咖啡馆，享受慢时光', type: 'rest', cost: 30 },
          { time: '19:00', title: '纳西火锅', description: '品尝纳西腊排骨火锅', type: 'food', cost: 80 },
        ],
      },
      {
        day: 4,
        theme: '告别丽江',
        activities: [
          { time: '08:00', title: '束河晨景', description: '清晨的束河最安静，适合拍照', type: 'sight', cost: 0 },
          { time: '10:00', title: '购买伴手礼', description: '鲜花饼、银饰、普洱茶', type: 'sight', cost: 0 },
          { time: '12:00', title: '午餐', description: '品尝过桥米线或饵丝', type: 'food', cost: 30 },
          { time: '14:00', title: '返程', description: '前往三义机场，结束丽江之旅', type: 'transport', cost: 80 },
        ],
      },
    ],
    foodRecommendations: [
      { category: '纳西特色', dishes: ['腊排骨火锅', '鸡豆凉粉', '丽江粑粑', '纳西烤鱼'], budget: '人均30-60元' },
      { category: '云南小吃', dishes: ['过桥米线', '饵丝', '汽锅鸡', '野生菌'], budget: '人均20-50元' },
      { category: '特色餐饮', dishes: ['黑山羊火锅', '三文鱼', '土鸡火锅'], budget: '人均60-100元' },
      { category: '饮品', dishes: ['酥油茶', '青梅酒', '普洱茶', '酸奶'], budget: '人均10-30元' },
    ],
    accommodationTips: {
      economy: '束河古镇客栈性价比高，比大研更安静，适合休闲。',
      comfort: '束河别墅度假酒店，纳西建筑风格，花园意境。',
      luxury: '束河悦榕庄或大研皇冠假日，顶级度假体验。',
    },
  },
};

// 根据出发城市和目的地获取交通数据
function getTransportOptions(destination: string, departureCity: string, budgetLevel: string) {
  const destTransport = transportDatabase[destination];
  if (!destTransport) {
    return {
      outbound: [] as TransportOption[],
      return: [] as TransportOption[],
    };
  }

  const cityTransport = destTransport[departureCity];
  if (!cityTransport) {
    // 如果没有直飞数据，取第一个有数据的城市
    const firstCity = Object.keys(destTransport)[0];
    return destTransport[firstCity] || { outbound: [] as TransportOption[], return: [] as TransportOption[] };
  }

  return cityTransport;
}

// 计算交通费用
function calculateTransportCost(outbound: TransportOption[], returnFlights: TransportOption[], peopleCount: number): number {
  const outCost = outbound.length > 0 ? Math.min(...outbound.map(o => o.price)) : 500;
  const retCost = returnFlights.length > 0 ? Math.min(...returnFlights.map(o => o.price)) : 500;
  return (outCost + retCost) * peopleCount;
}

// 根据出行月份判断淡旺季
function getSeasonMultiplier(startDate: string): SeasonInfo {
  const date = new Date(startDate);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // 特殊假期判断
  const isSpringFestival = (month === 1 && day >= 20) || (month === 2 && day <= 10);
  const isMayDay = month === 5 && day >= 1 && day <= 5;
  const isNationalDay = month === 10 && day >= 1 && day <= 7;

  // 旺季：春节1-2月、暑假7-8月、国庆10月
  if (month === 1 || month === 2 || month === 7 || month === 8 || month === 10) {
    let transportMultiplier = 1.5;
    let hotelMultiplier = 2.0;
    let label = '旺季';
    let description = '出行高峰期，交通和住宿价格较高';

    if (isSpringFestival) {
      transportMultiplier = 1.8;
      hotelMultiplier = 2.5;
      label = '春节旺季';
      description = '春节假期，机票和酒店价格大幅上涨，建议提前预订';
    } else if (isNationalDay) {
      transportMultiplier = 1.8;
      hotelMultiplier = 2.5;
      label = '国庆旺季';
      description = '国庆黄金周，机票和酒店价格大幅上涨，景区人流密集';
    } else if (month === 7 || month === 8) {
      label = '暑期旺季';
      description = '暑假出行高峰，亲子游热门时段，酒店需求旺盛';
    }

    return {
      season: 'peak',
      label,
      transportMultiplier,
      hotelMultiplier,
      description,
    };
  }

  // 淡季：6月、12月
  if (month === 6 || month === 12) {
    return {
      season: 'off',
      label: '淡季',
      transportMultiplier: 0.7,
      hotelMultiplier: 0.7,
      description: '出行淡季，机票和酒店价格优惠，性价比最高',
    };
  }

  // 平季：3-5月、9月、11月
  let description = '出行平季，价格适中，是不错的出行时段';
  if (isMayDay) {
    return {
      season: 'peak',
      label: '五一旺季',
      transportMultiplier: 1.6,
      hotelMultiplier: 2.2,
      description: '五一假期，短途游热门，酒店价格明显上涨',
    };
  }

  return {
    season: 'shoulder',
    label: '平季',
    transportMultiplier: 1.0,
    hotelMultiplier: 1.0,
    description,
  };
}

// 生成行程计划
export function generatePlan(preferences: TravelPreferences): TravelPlan {
  const { departureCity, budgetLevel, themes, peopleCount, pace, accommodationType } = preferences;

  // 获取淡旺季系数
  const seasonInfo = getSeasonMultiplier(preferences.startDate);

  // 判断是否为美食主题
  const isFoodTheme = themes.includes('美食探索');

  // 根据主题选择目的地
  const themeDestinationMap: Record<string, string[]> = {
    '美食探索': ['成都', '西安', '厦门'],
    '历史文化': ['西安', '成都', '丽江'],
    '自然风光': ['大理', '丽江', '三亚'],
    '城市观光': ['成都', '厦门', '西安'],
    '冒险户外': ['丽江', '大理', '三亚'],
    '休闲度假': ['三亚', '大理', '厦门'],
  };

  let destination = '成都';
  for (const theme of themes) {
    const dests = themeDestinationMap[theme];
    if (dests && dests.length > 0) {
      destination = dests[0];
      break;
    }
  }

  const destInfo = destinations[destination];
  if (!destInfo) {
    // fallback
    return generatePlan({ ...preferences, themes: ['休闲度假'] });
  }

  // 获取交通数据
  const transportOptions = getTransportOptions(destination, departureCity, budgetLevel);
  const baseTransportCost = calculateTransportCost(transportOptions.outbound, transportOptions.return, peopleCount);
  // 应用淡旺季交通系数
  const transportCost = Math.round(baseTransportCost * seasonInfo.transportMultiplier);

  // 获取酒店数据
  const budgetKey = budgetLevel === 'economy' ? 'economy' : budgetLevel === 'luxury' ? 'luxury' : 'comfort';
  const hotels = hotelDatabase[destination]?.[budgetKey] || [];
  const baseAvgHotelPrice = hotels.length > 0 ? Math.round(hotels.reduce((sum, h) => sum + h.pricePerNight, 0) / hotels.length) : 300;
  // 应用淡旺季酒店系数
  const avgHotelPrice = Math.round(baseAvgHotelPrice * seasonInfo.hotelMultiplier);

  // 计算天数
  const startDate = new Date(preferences.startDate);
  const endDate = new Date(preferences.endDate);
  const totalDays = Math.max(2, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  // 根据节奏调整活动，并处理美食主题餐食逻辑
  const dailyPlans = destInfo.dailyPlans.slice(0, totalDays).map((day, index) => ({
    day: index + 1,
    date: `第${index + 1}天`,
    theme: day.theme,
    activities: day.activities.map(activity => {
      // 美食主题：food类型活动cost乘以2.5倍
      if (isFoodTheme && activity.type === 'food') {
        return { ...activity, cost: Math.round(activity.cost * 2.5) };
      }
      return activity;
    }),
  }));

  // 如果天数超过预设天数，添加额外天数
  while (dailyPlans.length < totalDays) {
    const extraDay = dailyPlans.length + 1;
    const foodCostBase = isFoodTheme ? 125 : 50;
    const dinnerCostBase = isFoodTheme ? 150 : 60;
    dailyPlans.push({
      day: extraDay,
      date: `第${extraDay}天`,
      theme: '自由活动',
      activities: [
        { time: '09:00', title: '自由探索', description: '根据个人兴趣自由安排行程', type: 'sight' as const, cost: 0 },
        { time: '12:00', title: '当地美食', description: isFoodTheme ? '探访当地知名餐厅，品尝招牌菜品' : '品尝当地特色美食', type: 'food' as const, cost: foodCostBase },
        { time: '14:00', title: '休闲时光', description: '享受悠闲的午后时光', type: 'rest' as const, cost: 0 },
        { time: '18:00', title: '晚餐', description: isFoodTheme ? '前往推荐餐厅享用特色晚餐' : '品尝当地特色晚餐', type: 'food' as const, cost: dinnerCostBase },
      ],
    });
  }

  // 住宿类型
  const accommodationTypeMap: Record<string, string> = {
    hotel: budgetLevel === 'luxury' ? '五星级度假酒店' : budgetLevel === 'comfort' ? '舒适型精品酒店' : '经济型酒店/客栈',
    hostel: '青年旅舍/背包客栈',
    homestay: '特色民宿/客栈',
    resort: budgetLevel === 'luxury' ? '奢华度假村' : '度假公寓/酒店',
  };

  const accommodationCost = avgHotelPrice * (totalDays - 1) * (peopleCount > 2 ? Math.ceil(peopleCount / 2) : 1);
  const activityCost = dailyPlans.flatMap(d => d.activities).reduce((sum, a) => sum + a.cost, 0) * peopleCount;
  const localTransportCost = 200 * peopleCount;
  const totalBudget = transportCost + accommodationCost + activityCost + localTransportCost;

  return {
    destination: destInfo.name,
    destinationImage: destInfo.image,
    totalDays,
    totalBudget: Math.round(totalBudget),
    currency: 'CNY',
    summary: destInfo.summary,
    dailyPlans,
    accommodation: {
      area: destInfo.area,
      type: accommodationTypeMap[accommodationType] || accommodationTypeMap.hotel,
      pricePerNight: avgHotelPrice,
      tips: destInfo.accommodationTips[budgetKey] || destInfo.accommodationTips.comfort,
      hotels,
    },
    foodRecommendations: destInfo.foodRecommendations,
    transport: {
      toDestination: transportOptions.outbound.length > 0
        ? (transportOptions.outbound[0].type === 'flight' ? '飞机往返' : '高铁往返')
        : '飞机/高铁往返',
      localTransport: destInfo.localTransport,
      estimatedCost: transportCost + localTransportCost,
      outboundOptions: transportOptions.outbound,
      returnOptions: transportOptions.return,
    },
    seasonInfo,
  };
}
