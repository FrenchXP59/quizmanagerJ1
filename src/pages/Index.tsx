import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface Question {
  id: number;
  text: string;
  style: 'directif' | 'persuasif' | 'participatif' | 'delegatif';
}

interface StyleResult {
  name: string;
  score: number;
  description: string;
  characteristics: string[];
  color: string;
}

const questions: Question[] = [
  // Questions Directif (fort pilotage, faible soutien)
  { id: 1, text: "Je donne des instructions précises et détaillées à mon équipe", style: 'directif' },
  { id: 2, text: "Je supervise étroitement le travail de mes collaborateurs", style: 'directif' },
  { id: 3, text: "Je prends les décisions importantes sans consulter l'équipe", style: 'directif' },
  { id: 4, text: "Je définis clairement les objectifs et les échéances", style: 'directif' },
  { id: 5, text: "Je contrôle régulièrement l'avancement des tâches", style: 'directif' },
  { id: 6, text: "Je privilégie l'efficacité à court terme", style: 'directif' },

  // Questions Persuasif (fort pilotage, fort soutien)
  { id: 7, text: "J'explique le pourquoi de mes décisions à l'équipe", style: 'persuasif' },
  { id: 8, text: "Je motive mon équipe en valorisant les résultats", style: 'persuasif' },
  { id: 9, text: "Je guide tout en encourageant les initiatives", style: 'persuasif' },
  { id: 10, text: "Je forme activement mes collaborateurs", style: 'persuasif' },
  { id: 11, text: "Je communique régulièrement sur la vision et les objectifs", style: 'persuasif' },
  { id: 12, text: "Je soutiens mon équipe face aux difficultés", style: 'persuasif' },

  // Questions Participatif (faible pilotage, fort soutien)
  { id: 13, text: "Je consulte mon équipe avant de prendre des décisions", style: 'participatif' },
  { id: 14, text: "J'encourage les idées et suggestions de mes collaborateurs", style: 'participatif' },
  { id: 15, text: "Je facilite les échanges et la collaboration", style: 'participatif' },
  { id: 16, text: "Je fais confiance à l'expertise de mon équipe", style: 'participatif' },
  { id: 17, text: "Je privilégie le consensus dans les décisions", style: 'participatif' },
  { id: 18, text: "Je développe l'autonomie de mes collaborateurs", style: 'participatif' },

  // Questions Délégatif (faible pilotage, faible soutien)
  { id: 19, text: "Je laisse mon équipe s'organiser librement", style: 'delegatif' },
  { id: 20, text: "J'interviens peu dans le travail quotidien", style: 'delegatif' },
  { id: 21, text: "Je fais confiance à l'autonomie complète de l'équipe", style: 'delegatif' },
  { id: 22, text: "Je délègue la plupart des responsabilités", style: 'delegatif' },
  { id: 23, text: "Je me concentre sur la stratégie plutôt que l'opérationnel", style: 'delegatif' },
  { id: 24, text: "Je laisse l'équipe gérer ses propres conflits", style: 'delegatif' }
];

const styleDescriptions = {
  directif: {
    name: "Directif",
    description: "Vous privilégiez un pilotage fort avec un soutien limité. Vous donnez des directives claires et supervisez étroitement le travail.",
    characteristics: [
      "Instructions précises et détaillées",
      "Supervision étroite",
      "Décisions centralisées",
      "Contrôle régulier",
      "Focus sur l'efficacité"
    ],
    color: "#ef4444"
  },
  persuasif: {
    name: "Persuasif",
    description: "Vous combinez un pilotage fort avec un soutien élevé. Vous guidez tout en motivant et en expliquant vos décisions.",
    characteristics: [
      "Communication des objectifs",
      "Motivation de l'équipe",
      "Formation active",
      "Soutien face aux difficultés",
      "Explication des décisions"
    ],
    color: "#f59e0b"
  },
  participatif: {
    name: "Participatif",
    description: "Vous adoptez un pilotage modéré avec un fort soutien. Vous consultez l'équipe et encouragez la collaboration.",
    characteristics: [
      "Consultation de l'équipe",
      "Encouragement des idées",
      "Facilitation des échanges",
      "Développement de l'autonomie",
      "Recherche de consensus"
    ],
    color: "#10b981"
  },
  delegatif: {
    name: "Délégatif",
    description: "Vous privilégiez un pilotage minimal avec un soutien limité. Vous faites confiance à l'autonomie complète de l'équipe.",
    characteristics: [
      "Délégation importante",
      "Autonomie complète",
      "Intervention minimale",
      "Focus stratégique",
      "Confiance totale"
    ],
    color: "#6366f1"
  }
};

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleAnswer = (value: string) => {
    const score = parseInt(value);
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: score }));
    setSelectedAnswer(value);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[questions[currentQuestion + 1]?.id]?.toString() || '');
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1]?.id]?.toString() || '');
    }
  };

  const calculateResults = (): StyleResult[] => {
    const scores = {
      directif: 0,
      persuasif: 0,
      participatif: 0,
      delegatif: 0
    };

    questions.forEach(question => {
      const answer = answers[question.id] || 0;
      scores[question.style] += answer;
    });

    return Object.entries(scores).map(([style, score]) => ({
      name: styleDescriptions[style as keyof typeof styleDescriptions].name,
      score: Math.round((score / 24) * 100), // Pourcentage sur 24 points max (6 questions × 4 points)
      description: styleDescriptions[style as keyof typeof styleDescriptions].description,
      characteristics: styleDescriptions[style as keyof typeof styleDescriptions].characteristics,
      color: styleDescriptions[style as keyof typeof styleDescriptions].color
    }));
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer('');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const results = showResults ? calculateResults() : [];
  const dominantStyle = results.length > 0 ? results.reduce((prev, current) => (prev.score > current.score) ? prev : current) : null;

  const radarData = results.map(result => ({
    style: result.name,
    score: result.score
  }));

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">Vos Résultats</CardTitle>
              <CardDescription className="text-lg">
                Quiz d'auto-positionnement sur les styles managériaux
              </CardDescription>
            </CardHeader>
          </Card>

          {dominantStyle && (
            <Card className="mb-8 border-l-4" style={{ borderLeftColor: dominantStyle.color }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge 
                    className="text-white px-3 py-1" 
                    style={{ backgroundColor: dominantStyle.color }}
                  >
                    Style Dominant
                  </Badge>
                  <CardTitle className="text-2xl">{dominantStyle.name}</CardTitle>
                  <span className="text-xl font-semibold text-gray-600">{dominantStyle.score}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{dominantStyle.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dominantStyle.characteristics.map((char, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: dominantStyle.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{char}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Graphique Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="style" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scores Détaillés</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                    <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {results.map((result, index) => (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: result.color }}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                    <Badge variant="outline">{result.score}%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{result.description}</p>
                  <div className="space-y-1">
                    {result.characteristics.map((char, charIndex) => (
                      <div key={charIndex} className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: result.color }}
                        ></div>
                        <span className="text-xs text-gray-500">{char}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={restartQuiz} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Refaire le Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">Quiz Styles Managériaux</CardTitle>
            <CardDescription className="text-lg">
              Découvrez votre style de management dominant
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} sur {questions.length}
              </span>
              <Badge variant="outline">{Math.round(progress)}% complété</Badge>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-xl leading-relaxed">
              {questions[currentQuestion].text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswer}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1" className="flex-1 cursor-pointer">Jamais</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2" className="flex-1 cursor-pointer">Parfois</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3" className="flex-1 cursor-pointer">Souvent</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4" className="flex-1 cursor-pointer">Toujours</Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            onClick={previousQuestion} 
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Précédent
          </Button>
          <Button 
            onClick={nextQuestion} 
            disabled={!selectedAnswer}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {currentQuestion === questions.length - 1 ? 'Voir les résultats' : 'Suivant'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
