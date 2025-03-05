import React, { useState, useEffect } from 'react';
import { Scale, Ruler, Heart, Activity, Info } from 'lucide-react';

interface BMICategory {
  range: string;
  description: string;
  tips: string[];
}

const BMICategories: Record<string, BMICategory> = {
  underweight: {
    range: "< 18.5",
    description: "You are underweight. Focus on healthy weight gain.",
    tips: [
      "Eat nutrient-dense foods",
      "Include protein in every meal",
      "Consider strength training",
      "Consult a nutritionist for guidance"
    ]
  },
  normal: {
    range: "18.5 - 24.9",
    description: "You have a healthy weight. Keep up the good work!",
    tips: [
      "Maintain a balanced diet",
      "Regular exercise",
      "Stay hydrated",
      "Get adequate sleep"
    ]
  },
  overweight: {
    range: "25 - 29.9",
    description: "You are overweight. Consider lifestyle changes.",
    tips: [
      "Monitor portion sizes",
      "Increase physical activity",
      "Choose whole foods",
      "Track your progress"
    ]
  },
  obese: {
    range: "≥ 30",
    description: "You are in the obese range. Consult healthcare providers.",
    tips: [
      "Seek medical advice",
      "Start with gentle exercise",
      "Make dietary changes",
      "Consider professional support"
    ]
  }
};

function App() {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBMI] = useState<number>(0);
  const [category, setCategory] = useState<string>('normal'); // Set initial category
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    const bmiValue = weight / Math.pow(height / 100, 2);
    setBMI(parseFloat(bmiValue.toFixed(1)));

    if (bmiValue < 18.5) setCategory('underweight');
    else if (bmiValue < 25) setCategory('normal');
    else if (bmiValue < 30) setCategory('overweight');
    else setCategory('obese');

    setShowResult(true);
  }, [height, weight]);

  // Ensure we have a valid category
  const currentCategory = BMICategories[category] || BMICategories.normal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">BMI Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
                  <Ruler className="w-5 h-5 text-blue-500" />
                  Height (cm)
                </label>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-center mt-2 text-lg font-semibold text-gray-600">
                  {height} cm
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  Weight (kg)
                </label>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-center mt-2 text-lg font-semibold text-gray-600">
                  {weight} kg
                </div>
              </div>
            </div>

            <div className={`transform transition-all duration-500 ${showResult ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{bmi}</div>
                  <div className="text-lg font-medium text-gray-600">Your BMI</div>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-700">Category: {category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </div>
                  <p className="text-gray-600">{currentCategory.description}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Health Tips</h3>
                </div>
                <ul className="space-y-2">
                  {currentCategory.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Note: BMI is a general indicator and may not be accurate for athletes, elderly, or pregnant women.</p>
          <p>Always consult healthcare professionals for personalized advice.</p>
        </div>
      </div>
    </div>
  );
}

export default App;