import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Wallet,
  Clock,
  Hotel,
  Bus,
  Utensils,
  ArrowLeft,
  Share2,
  Download,
  Sun,
  Mountain,
  Coffee,
  Navigation,
  CircleDot,
  Plane,
  Train,
  Star,
  MapPinned,
  Wifi,
  Luggage,
  Shield,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useTravelStore } from '@/store/travelStore';
import { generatePlan } from '@/data/mockPlans';
import type { TravelPreferences, TransportOption, HotelOption } from '@/types/travel';

const activityTypeConfig = {
  sight: { icon: Mountain, color: 'bg-teal-100 text-teal-700', label: '景点' },
  transport: { icon: Navigation, color: 'bg-blue-100 text-blue-700', label: '交通' },
  food: { icon: Utensils, color: 'bg-orange-100 text-orange-700', label: '美食' },
  rest: { icon: Coffee, color: 'bg-purple-100 text-purple-700', label: '休息' },
};

function TransportIcon({ type }: { type: string }) {
  if (type === 'flight') return <Plane className="w-4 h-4" />;
  if (type === 'train') return <Train className="w-4 h-4" />;
  return <Bus className="w-4 h-4" />;
}

function TransportCard({ option, direction }: { option: TransportOption; direction: string }) {
  const isFlight = option.type === 'flight';
  return (
    <div className="border border-stone-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isFlight ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'}`}>
            <TransportIcon type={option.type} />
          </div>
          <div>
            <div className="font-semibold text-stone-800 text-sm">
              {isFlight ? option.airline : option.trainType}
            </div>
            <div className="text-xs text-stone-400">
              {isFlight ? option.flightNo : option.trainNo} · {option.seatType || '经济舱'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-orange-600">¥{option.price}</div>
          <div className="text-xs text-stone-400">{direction}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="font-semibold text-stone-800">{option.departureTime}</div>
          <div className="text-xs text-stone-500">{option.departure}</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs text-stone-400">{option.duration}</div>
          <div className="w-full h-0.5 bg-stone-200 my-1 relative">
            <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-stone-300" />
          </div>
        </div>
        <div className="flex-1 text-right">
          <div className="font-semibold text-stone-800">{option.arrivalTime}</div>
          <div className="text-xs text-stone-500">{option.arrival}</div>
        </div>
      </div>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: HotelOption }) {
  return (
    <div className="border border-stone-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-stone-800">{hotel.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">{hotel.type}</span>
            <span className="text-xs text-stone-400">{hotel.platform} 推荐</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-orange-600 text-lg">¥{hotel.pricePerNight}</div>
          <div className="text-xs text-stone-400">/晚</div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="text-sm font-medium text-stone-700">{hotel.rating}</span>
        <span className="text-xs text-stone-400">({hotel.reviewCount}条评价)</span>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <MapPinned className="w-3.5 h-3.5 text-stone-400" />
          <span>{hotel.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <Navigation className="w-3.5 h-3.5 text-stone-400" />
          <span>{hotel.distanceToAttraction}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {hotel.features.map((feature: string) => (
          <span key={feature} className="text-xs bg-stone-50 text-stone-500 px-2 py-0.5 rounded-full flex items-center gap-1">
            {feature.includes('WiFi') && <Wifi className="w-3 h-3" />}
            {feature.includes('行李') && <Luggage className="w-3 h-3" />}
            {feature.includes('地铁') && <MapPinned className="w-3 h-3" />}
            {!feature.includes('WiFi') && !feature.includes('行李') && !feature.includes('地铁') && <Shield className="w-3 h-3" />}
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Plan() {
  const navigate = useNavigate();
  const { plan, preferences, isAdjusting, setPreferences, setPlan, setIsAdjusting, reset } = useTravelStore();

  // 调整偏好的本地状态
  const [adjustBudget, setAdjustBudget] = useState<TravelPreferences['budgetLevel']>('comfort');
  const [adjustPace, setAdjustPace] = useState<TravelPreferences['pace']>('balanced');
  const [adjustAccommodation, setAdjustAccommodation] = useState<string>('star-hotel');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // 当 preferences 变化时，同步本地调整状态
  useEffect(() => {
    if (preferences) {
      setAdjustBudget(preferences.budgetLevel);
      setAdjustPace(preferences.pace);
      setAdjustAccommodation(preferences.accommodationType);
    }
  }, [preferences]);

  useEffect(() => {
    if (!plan) {
      navigate('/');
    }
  }, [plan, navigate]);

  if (!plan || !preferences) return null;

  const peopleCount = preferences.peopleCount;
  const roomCount = Math.ceil(peopleCount / 2);

  const handleBack = () => {
    if (!window.confirm('确定要重新定制行程吗？当前方案将丢失。')) return;
    reset();
    navigate('/');
  };

  const handleRegenerate = () => {
    if (!preferences) return;
    setIsRegenerating(true);

    const updatedPreferences: TravelPreferences = {
      ...preferences,
      budgetLevel: adjustBudget,
      pace: adjustPace,
      accommodationType: adjustAccommodation,
    };

    setPreferences(updatedPreferences);

    setTimeout(() => {
      const newPlan = generatePlan(updatedPreferences);
      setPlan(newPlan);
      setIsAdjusting(false);
      setIsRegenerating(false);
    }, 1200);
  };

  const budgetLevelText = {
    economy: '经济型',
    comfort: '舒适型',
    luxury: '豪华型',
  }[preferences.budgetLevel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={plan.destinationImage}
          alt={plan.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            重新定制
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{plan.totalDays} 天行程</span>
              <span className="mx-2">·</span>
              <span className="text-sm">{budgetLevelText}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {plan.destination}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">{plan.summary}</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-stone-500">行程天数</div>
              <div className="font-semibold text-stone-800">{plan.totalDays} 天</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xs text-stone-500">预估总费用</div>
              <div className="font-semibold text-stone-800">
                ¥{plan.totalBudget.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-stone-500">大交通</div>
              <div className="font-semibold text-stone-800 text-sm truncate max-w-[120px]">
                {plan.transport.toDestination}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Hotel className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-stone-500">住宿</div>
              <div className="font-semibold text-stone-800 text-sm truncate max-w-[120px]">
                {plan.accommodation.type}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Season Info Banner */}
        <div className={`rounded-2xl p-4 flex items-center gap-4 ${
          plan.seasonInfo.season === 'peak' ? 'bg-orange-50 border border-orange-200' :
          plan.seasonInfo.season === 'off' ? 'bg-green-50 border border-green-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            plan.seasonInfo.season === 'peak' ? 'bg-orange-100 text-orange-600' :
            plan.seasonInfo.season === 'off' ? 'bg-green-100 text-green-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            <Sun className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                plan.seasonInfo.season === 'peak' ? 'bg-orange-100 text-orange-700' :
                plan.seasonInfo.season === 'off' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {plan.seasonInfo.label}
              </span>
              <span className="text-sm text-stone-500">
                交通系数 ×{plan.seasonInfo.transportMultiplier} · 酒店系数 ×{plan.seasonInfo.hotelMultiplier}
              </span>
            </div>
            <p className="text-sm text-stone-600 mt-1">{plan.seasonInfo.description}</p>
          </div>
        </div>

        {/* Daily Itinerary */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <Sun className="w-6 h-6 text-teal-600" />
            每日行程
          </h2>

          <div className="space-y-8">
            {plan.dailyPlans.map((day, dayIndex) => (
              <div
                key={day.day}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                style={{ animationDelay: `${dayIndex * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-teal-100 text-sm">{day.date}</span>
                      <h3 className="text-white font-semibold text-lg">{day.theme}</h3>
                    </div>
                    <div className="text-white/80 text-sm">
                      {day.activities.length} 个活动
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-stone-100" />

                    <div className="space-y-6">
                      {day.activities.map((activity, actIndex) => {
                        const config = activityTypeConfig[activity.type];
                        const Icon = config.icon;

                        return (
                          <div key={actIndex} className="relative flex gap-4">
                            {/* Timeline dot */}
                            <div className="relative z-10">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${config.color}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-teal-600">
                                  {activity.time}
                                </span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${config.color}`}
                                >
                                  {config.label}
                                </span>
                              </div>
                              <h4 className="font-semibold text-stone-800 mb-1">
                                {activity.title}
                              </h4>
                              <p className="text-sm text-stone-500 mb-2">
                                {activity.description}
                              </p>
                              {activity.cost > 0 && (
                                <span className="text-xs text-orange-600 font-medium">
                                  预估 ¥{activity.cost}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodation */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <Hotel className="w-6 h-6 text-teal-600" />
            住宿建议
          </h2>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-sm text-stone-500 mb-1">推荐区域</div>
                <div className="font-semibold text-stone-800 text-lg mb-4">
                  {plan.accommodation.area}
                </div>

                <div className="text-sm text-stone-500 mb-1">住宿类型</div>
                <div className="font-semibold text-stone-800 mb-4">
                  {plan.accommodation.type}
                </div>

                <div className="text-sm text-stone-500 mb-1">参考价格</div>
                <div className="font-semibold text-teal-600 text-xl">
                  ¥{plan.accommodation.pricePerNight}
                  <span className="text-sm text-stone-400 font-normal"> /晚</span>
                </div>
              </div>

              <div className="bg-teal-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-teal-800">住宿小贴士</span>
                </div>
                <p className="text-sm text-teal-700 leading-relaxed">
                  {plan.accommodation.tips}
                </p>
              </div>
            </div>

            {/* Hotel Recommendations */}
            {plan.accommodation.hotels && plan.accommodation.hotels.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400" />
                  精选酒店推荐（已交叉对比携程、美团、飞猪等平台）
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.accommodation.hotels.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Food Recommendations */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-teal-600" />
            美食推荐
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {plan.foodRecommendations.map((food, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-stone-800">{food.category}</h3>
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    {food.budget}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {food.dishes.map((dish) => (
                    <span
                      key={dish}
                      className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transport Summary */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <Bus className="w-6 h-6 text-teal-600" />
            交通方案
          </h2>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-sm text-stone-500 mb-1">大交通</div>
                <div className="font-semibold text-stone-800">
                  {plan.transport.toDestination}
                </div>
              </div>
              <div>
                <div className="text-sm text-stone-500 mb-1">当地交通</div>
                <div className="font-semibold text-stone-800">
                  {plan.transport.localTransport}
                </div>
              </div>
              <div>
                <div className="text-sm text-stone-500 mb-1">交通预估费用</div>
                <div className="font-semibold text-teal-600 text-xl">
                  ¥{plan.transport.estimatedCost.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Outbound Options */}
            {plan.transport.outboundOptions && plan.transport.outboundOptions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-1">
                  <Plane className="w-4 h-4 text-sky-500" />
                  去程推荐班次
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.transport.outboundOptions.map((option, index) => (
                    <TransportCard key={index} option={option} direction="去程" />
                  ))}
                </div>
              </div>
            )}

            {/* Return Options */}
            {plan.transport.returnOptions && plan.transport.returnOptions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-1">
                  <Plane className="w-4 h-4 text-sky-500" />
                  返程推荐班次
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.transport.returnOptions.map((option, index) => (
                    <TransportCard key={index} option={option} direction="返程" />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-stone-400 bg-stone-50 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <Shield className="w-3 h-3" />
                <span>数据来源说明</span>
              </div>
              <p>航班数据参考航旅纵横实时搜索，高铁数据参考12306官方信息。实际票价可能因日期、余票情况浮动，建议出行前再次确认。</p>
            </div>
          </div>
        </section>

        {/* Budget Breakdown */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-teal-600" />
            费用明细
          </h2>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600">交通费用</span>
                <span className="font-semibold text-stone-800">
                  ¥{plan.transport.estimatedCost.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600">
                  住宿费用（{plan.totalDays - 1}晚 × {roomCount}间）
                </span>
                <span className="font-semibold text-stone-800">
                  ¥
                  {(
                    plan.accommodation.pricePerNight *
                    (plan.totalDays - 1) *
                    roomCount
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600">景点门票</span>
                <span className="font-semibold text-stone-800">
                  ¥
                  {(
                    plan.dailyPlans
                      .flatMap((d) => d.activities)
                      .filter((a) => a.type === 'sight')
                      .reduce((sum, a) => sum + a.cost, 0) * peopleCount
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <span className="text-stone-600">餐饮费用</span>
                <span className="font-semibold text-stone-800">
                  ¥
                  {(
                    plan.dailyPlans
                      .flatMap((d) => d.activities)
                      .filter((a) => a.type === 'food')
                      .reduce((sum, a) => sum + a.cost, 0) * peopleCount
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 bg-teal-50 rounded-xl px-4">
                <span className="font-semibold text-teal-800">预估总费用</span>
                <span className="font-bold text-teal-700 text-xl">
                  ¥{plan.totalBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Adjust Plan Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-teal-600" />
              调整方案
            </h2>
            {!isAdjusting && (
              <button
                onClick={() => setIsAdjusting(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                快速调整
              </button>
            )}
          </div>

          {!isAdjusting ? (
            <p className="text-stone-500">
              对方案不满意？点击"快速调整"修改预算等级、出行节奏和住宿偏好，重新生成方案。
            </p>
          ) : (
            <div className="space-y-6">
              <p className="text-stone-500 text-sm">
                调整以下选项后点击"重新生成方案"，我们将根据新偏好为您定制行程。
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* 预算等级调整 */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    <Wallet className="w-4 h-4 inline mr-1 text-teal-600" />
                    预算等级
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: 'economy' as const, label: '经济型', desc: '人均2000-3500' },
                      { value: 'comfort' as const, label: '舒适型', desc: '人均3500-6000' },
                      { value: 'luxury' as const, label: '豪华型', desc: '人均6000+' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setAdjustBudget(option.value)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          adjustBudget === option.value
                            ? 'border-teal-500 bg-teal-50 text-teal-800'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className="text-xs mt-0.5 opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 出行节奏调整 */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    <Clock className="w-4 h-4 inline mr-1 text-teal-600" />
                    出行节奏
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: 'intensive' as const, label: '紧凑充实', desc: '每天3-4个景点' },
                      { value: 'balanced' as const, label: '适中平衡', desc: '每天2-3个景点' },
                      { value: 'relaxed' as const, label: '悠闲放松', desc: '每天1-2个景点' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setAdjustPace(option.value)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          adjustPace === option.value
                            ? 'border-teal-500 bg-teal-50 text-teal-800'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className="text-xs mt-0.5 opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 住宿偏好调整 */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    <Hotel className="w-4 h-4 inline mr-1 text-teal-600" />
                    住宿偏好
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: 'hostel', label: '青年旅舍' },
                      { value: 'budget-hotel', label: '经济酒店' },
                      { value: 'boutique', label: '精品民宿' },
                      { value: 'star-hotel', label: '星级酒店' },
                      { value: 'resort', label: '度假村' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setAdjustAccommodation(option.value)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          adjustAccommodation === option.value
                            ? 'border-teal-500 bg-teal-50 text-teal-800'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <div className="font-semibold text-sm">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-100">
                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${
                    isRegenerating
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/25 hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isRegenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      重新生成中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      重新生成方案
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsAdjusting(false)}
                  disabled={isRegenerating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-stone-600 hover:bg-stone-100 rounded-full font-medium transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Footer CTA */}
        <div className="text-center pb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-medium shadow-lg shadow-teal-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            重新定制行程
          </button>
        </div>
      </div>
    </div>
  );
}
