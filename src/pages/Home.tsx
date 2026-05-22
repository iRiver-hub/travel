import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  Clock,
  Hotel,
  Bus,
  MessageSquare,
  Plane,
  ArrowRight,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { useTravelStore } from '@/store/travelStore';
import { generatePlan } from '@/data/mockPlans';
import type { TravelPreferences } from '@/types/travel';

const steps = [
  { id: 1, title: '出行信息', icon: Users },
  { id: 2, title: '时间与预算', icon: Calendar },
  { id: 3, title: '旅行偏好', icon: Compass },
  { id: 4, title: '交通住宿', icon: Hotel },
  { id: 5, title: '特殊需求', icon: MessageSquare },
];

const themeOptions = [
  { value: '自然风光', label: '自然风光' },
  { value: '历史文化', label: '历史文化' },
  { value: '美食探索', label: '美食探索' },
  { value: '城市观光', label: '城市观光' },
  { value: '冒险户外', label: '冒险户外' },
  { value: '休闲度假', label: '休闲度假' },
];

export default function Home() {
  const navigate = useNavigate();
  const { setPreferences, setPlan } = useTravelStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<TravelPreferences>({
    peopleCount: 2,
    genderComposition: '',
    hasChildren: false,
    hasElderly: false,
    startDate: '',
    endDate: '',
    departureCity: '',
    budgetLevel: 'comfort',
    themes: [],
    pace: 'balanced',
    accommodationType: 'hotel',
    transportPreference: 'public',
    specialNeeds: '',
    acceptRedEye: false,
    acceptTransfer: false,
  });

  const updateField = <K extends keyof TravelPreferences>(
    field: K,
    value: TravelPreferences[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTheme = (theme: string) => {
    setFormData((prev) => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter((t) => t !== theme)
        : [...prev.themes, theme],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setPreferences(formData);

    setTimeout(() => {
      const plan = generatePlan(formData);
      setPlan(plan);
      setIsSubmitting(false);
      navigate('/plan');
    }, 1500);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.peopleCount > 0 && formData.genderComposition !== '';
      case 1:
        return formData.startDate && formData.endDate && formData.departureCity;
      case 2:
        return formData.themes.length > 0;
      case 3:
        return formData.accommodationType && formData.transportPreference;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      {!showForm ? (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-stone-600">智能定制 · 最具性价比</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 mb-6 leading-tight">
              发现你的
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                完美旅程
              </span>
            </h1>

            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-xl mx-auto leading-relaxed">
              告诉我们你的旅行需求，我们为你量身定制最具性价比的行程计划，
              包含目的地、交通、住宿与美食推荐。
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full text-lg font-medium shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              开始定制
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { icon: MapPin, label: '精选目的地' },
                { icon: Wallet, label: '预算优化' },
                { icon: Compass, label: '个性行程' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-sm text-stone-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">定制你的旅行计划</h2>
              <p className="text-stone-500">填写以下信息，我们将为你生成专属行程</p>
            </div>

            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/25'
                            : isCompleted
                            ? 'bg-teal-100 text-teal-700'
                            : 'bg-stone-100 text-stone-400'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          isActive ? 'text-teal-700' : isCompleted ? 'text-teal-600' : 'text-stone-400'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 h-1 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-600 to-cyan-600 transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8">
              {currentStep === 0 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    出行人员信息
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      出行人数 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateField('peopleCount', Math.max(1, formData.peopleCount - 1))}
                        className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-2xl font-semibold text-stone-800 w-12 text-center">
                        {formData.peopleCount}
                      </span>
                      <button
                        onClick={() => updateField('peopleCount', formData.peopleCount + 1)}
                        className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      性别构成 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.genderComposition}
                      onChange={(e) => updateField('genderComposition', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    >
                      <option value="">请选择</option>
                      <option value="all-male">全部为男性</option>
                      <option value="all-female">全部为女性</option>
                      <option value="couple">情侣/夫妻</option>
                      <option value="mixed">男女混合</option>
                      <option value="family">家庭出行</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasChildren}
                        onChange={(e) => updateField('hasChildren', e.target.checked)}
                        className="w-5 h-5 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-stone-700">携带儿童</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasElderly}
                        onChange={(e) => updateField('hasElderly', e.target.checked)}
                        className="w-5 h-5 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-stone-700">携带老人</span>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    时间与预算
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        出发日期 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateField('startDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        返程日期 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateField('endDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      出发城市 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.departureCity}
                      onChange={(e) => updateField('departureCity', e.target.value)}
                      placeholder="例如：北京、上海、广州"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      预算等级 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'economy', label: '经济型', desc: '人均2000-3500' },
                        { value: 'comfort', label: '舒适型', desc: '人均3500-6000' },
                        { value: 'luxury', label: '豪华型', desc: '人均6000+' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateField('budgetLevel', option.value as TravelPreferences['budgetLevel'])}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.budgetLevel === option.value
                              ? 'border-teal-500 bg-teal-50 text-teal-800'
                              : 'border-stone-200 hover:border-stone-300 text-stone-600'
                          }`}
                        >
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-xs mt-1 opacity-75">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-teal-600" />
                    旅行偏好
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      旅行主题 <span className="text-red-500">*</span>（可多选）
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {themeOptions.map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() => toggleTheme(theme.value)}
                          className={`p-3 rounded-xl border-2 transition-all text-left ${
                            formData.themes.includes(theme.value)
                              ? 'border-teal-500 bg-teal-50 text-teal-800'
                              : 'border-stone-200 hover:border-stone-300 text-stone-600'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {formData.themes.includes(theme.value) && (
                              <Check className="w-4 h-4 text-teal-600" />
                            )}
                            <span className="font-medium">{theme.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      行程节奏 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'intensive', label: '紧凑充实', desc: '每天3-4个景点' },
                        { value: 'balanced', label: '适中平衡', desc: '每天2-3个景点' },
                        { value: 'relaxed', label: '悠闲放松', desc: '每天1-2个景点' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateField('pace', option.value as TravelPreferences['pace'])}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.pace === option.value
                              ? 'border-teal-500 bg-teal-50 text-teal-800'
                              : 'border-stone-200 hover:border-stone-300 text-stone-600'
                          }`}
                        >
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-xs mt-1 opacity-75">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-teal-600" />
                    交通与住宿偏好
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      住宿偏好 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'hostel', label: '青年旅舍', icon: Users },
                        { value: 'budget-hotel', label: '经济酒店', icon: Hotel },
                        { value: 'boutique', label: '精品民宿', icon: Sparkles },
                        { value: 'star-hotel', label: '星级酒店', icon: Hotel },
                        { value: 'resort', label: '度假村', icon: MapPin },
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => updateField('accommodationType', option.value)}
                            className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                              formData.accommodationType === option.value
                                ? 'border-teal-500 bg-teal-50 text-teal-800'
                                : 'border-stone-200 hover:border-stone-300 text-stone-600'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      交通偏好 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'public', label: '公共交通优先', icon: Bus },
                        { value: 'rental', label: '租车自驾', icon: Compass },
                        { value: 'charter', label: '包车/专车', icon: MapPin },
                        { value: 'mixed', label: '混合方式', icon: Clock },
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => updateField('transportPreference', option.value)}
                            className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                              formData.transportPreference === option.value
                                ? 'border-teal-500 bg-teal-50 text-teal-800'
                                : 'border-stone-200 hover:border-stone-300 text-stone-600'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-teal-600" />
                    特殊需求与备注
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      特殊需求
                    </label>
                    <textarea
                      value={formData.specialNeeds}
                      onChange={(e) => updateField('specialNeeds', e.target.value)}
                      placeholder="饮食禁忌、无障碍需求、必去景点、过敏史等..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.acceptRedEye}
                        onChange={(e) => updateField('acceptRedEye', e.target.checked)}
                        className="w-5 h-5 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <div className="font-medium text-stone-700 flex items-center gap-2">
                          <Plane className="w-4 h-4" />
                          接受红眼航班
                        </div>
                        <div className="text-xs text-stone-500">可节省约20-30%交通费用</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.acceptTransfer}
                        onChange={(e) => updateField('acceptTransfer', e.target.checked)}
                        className="w-5 h-5 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <div className="font-medium text-stone-700 flex items-center gap-2">
                          <Bus className="w-4 h-4" />
                          接受中转/经停
                        </div>
                        <div className="text-xs text-stone-500">可节省约15-25%交通费用</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    currentStep === 0
                      ? 'text-stone-300 cursor-not-allowed'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  上一步
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid() || isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${
                    isStepValid() && !isSubmitting
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/25 hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      生成中...
                    </>
                  ) : currentStep === steps.length - 1 ? (
                    <>
                      生成计划
                      <Sparkles className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      下一步
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
