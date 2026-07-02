import { useState } from "react";

const activityLevels = [
  { value: 1.2, label: "Sedentary (little or no exercise)" },
  { value: 1.375, label: "Lightly active (light exercise 1-3 days/week)" },
  { value: 1.55, label: "Moderately active (moderate exercise 3-5 days/week)" },
  { value: 1.725, label: "Very active (hard exercise 6-7 days/week)" },
  { value: 1.9, label: "Extra active (very hard exercise or physical job)" },
];

export default function CalorieCalculator() {
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("female");
  const [activity, setActivity] = useState(1.55);

  const bmr = Math.round(
    10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161)
  );
  const tdee = Math.round(bmr * activity);
  const mildLoss = Math.round(tdee - 300);
  const mildGain = Math.round(tdee + 300);

  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <div className="rounded-3xl bg-white shadow-xl border border-[#8fbf1a]/10 overflow-hidden">
        <div className="bg-[#005c29] px-8 py-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Calorie Calculator</h1>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-2xl">
            Estimate your daily calories based on age, weight, height, activity level, and gender.
          </p>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Age</label>
            <input
              type="number"
              min="10"
              max="120"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            />

            <label className="block text-sm font-semibold text-slate-700">Weight (kg)</label>
            <input
              type="number"
              min="30"
              max="250"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            />

            <label className="block text-sm font-semibold text-slate-700">Height (cm)</label>
            <input
              type="number"
              min="100"
              max="250"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Gender</label>
              <div className="mt-2 flex gap-3">
                {[
                  { value: "female", label: "Female" },
                  { value: "male", label: "Male" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGender(option.value)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      gender === option.value
                        ? "border-[#8fbf1a] bg-[#8fbf1a]/10 text-[#005c29]"
                        : "border-slate-300 bg-white text-slate-700 hover:border-[#8fbf1a]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm font-semibold text-slate-700">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            >
              {activityLevels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="rounded-3xl border border-slate-200 bg-[#f8fff1] p-4 text-sm text-slate-700">
              <p className="font-semibold">How it works</p>
              <p className="mt-2 leading-6">
                BMR is calculated using the Mifflin-St Jeor formula. Your daily calorie needs are estimated by applying your activity level.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">BMR</p>
              <p className="mt-4 text-4xl font-bold text-[#005c29]">{bmr}</p>
              <p className="mt-2 text-sm text-slate-500">Calories to maintain your body at rest.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Daily Need</p>
              <p className="mt-4 text-4xl font-bold text-[#8fbf1a]">{tdee}</p>
              <p className="mt-2 text-sm text-slate-500">Estimated calories needed to maintain your current weight.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Goal Targets</p>
              <p className="mt-4 text-lg font-semibold text-slate-700">Lose: {mildLoss}</p>
              <p className="text-lg font-semibold text-slate-700">Gain: {mildGain}</p>
              <p className="mt-3 text-sm text-slate-500">
                Estimated mild daily calories for slow weight loss or gain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
