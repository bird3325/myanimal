
import { GoogleGenAI, Type } from "@google/genai";

// Ensure you have the API key in your environment variables
const API_KEY = process.env.API_KEY as string;
if (!API_KEY) {
    console.warn("API_KEY is not set in environment variables. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        catchphrase: { type: Type.STRING, description: "동물상의 특징을 한 문장으로 표현하는 캐치프레이즈. 예: '온화하고 친화력 넘치는 모든 사람의 친구!'" },
        facial_features: {
            type: Type.OBJECT,
            properties: {
                eyes: { type: Type.STRING, description: "눈매 특징과 그에 따른 성격 해석" },
                nose: { type: Type.STRING, description: "코 모양 특징과 그에 따른 성격 해석" },
                lips: { type: Type.STRING, description: "입술 모양 특징과 그에 따른 성격 해석" },
                face_shape: { type: Type.STRING, description: "얼굴형 특징과 그에 따른 성격 해석" }
            },
            required: ["eyes", "nose", "lips", "face_shape"]
        },
        personality: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "성격에 대한 전반적인 요약" },
                strengths: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "성격의 장점 3가지"
                },
                weakness: { type: Type.STRING, description: "주의해야 할 성격적 약점 1가지" },
                romance_style: { type: Type.STRING, description: "연애 스타일" }
            },
            required: ["summary", "strengths", "weakness", "romance_style"]
        },
        fortune_2025: {
            type: Type.OBJECT,
            properties: {
                total: { type: Type.INTEGER, description: "2025년 전체 운세 점수 (1~5점)" },
                romance: { type: Type.INTEGER, description: "2025년 연애운 점수 (1~5점)" },
                work: { type: Type.INTEGER, description: "2025년 직업운 점수 (1~5점)" },
                health: { type: Type.INTEGER, description: "2025년 건강운 점수 (1~5점)" },
                summary: { type: Type.STRING, description: "2025년 운세 총평" },
                lucky_color: { type: Type.STRING, description: "행운의 색깔" },
                lucky_item: { type: Type.STRING, description: "행운의 아이템" }
            },
            required: ["total", "romance", "work", "health", "summary", "lucky_color", "lucky_item"]
        },
        compatibility: {
            type: Type.OBJECT,
            properties: {
                best_match: { type: Type.STRING, description: "최고의 궁합인 동물상" },
                best_match_reason: { type: Type.STRING, description: "최고의 궁합인 이유" },
                good_match: { type: Type.STRING, description: "좋은 궁합인 동물상" },
                good_match_reason: { type: Type.STRING, description: "좋은 궁합인 이유" },
            },
            required: ["best_match", "best_match_reason", "good_match", "good_match_reason"]
        },
    },
    required: ["catchphrase", "facial_features", "personality", "fortune_2025", "compatibility"]
};


const mockResponse = {
    catchphrase: "온화하고 친화력 넘치는 모든 사람의 친구!",
    facial_features: {
        eyes: "둥글고 온화한 눈: 호기심이 많고 솔직한 성격",
        nose: "적당한 높이의 직선형 코: 균형감각이 뛰어나고 신중함",
        lips: "적당한 두께, 살짝 웃는 입술: 다정하고 유머감각이 좋음",
        face_shape: "부드러운 타원형 얼굴: 원만한 인간관계, 높은 친화력"
    },
    personality: {
        summary: "따뜻한 마음과 긍정적인 에너지로 주변 사람들에게 행복을 전파하는 당신은 함께 있으면 기분 좋아지는 사람입니다.",
        strengths: [
            "누구와도 금세 친해지는 사교성",
            "따뜻하고 배려심 많은 마음",
            "긍정적이고 밝은 에너지"
        ],
        weakness: "가끔 너무 순진해서 속기 쉬워요",
        romance_style: "진실한 사랑을 추구하는 로맨티스트"
    },
    fortune_2025: {
        total: 4,
        romance: 5,
        work: 3,
        health: 4,
        summary: "따뜻한 마음씨로 많은 사람들의 사랑을 받게 될 한 해예요! 새로운 인연과 기회가 찾아옵니다.",
        lucky_color: "하늘색, 연두색",
        lucky_item: "강아지 모양 악세서리"
    },
    compatibility: {
        best_match: "러시안블루상",
        best_match_reason: "서로 다른 매력으로 완벽한 조화를 이룹니다.",
        good_match: "토끼상",
        good_match_reason: "둘 다 순수해서 편안한 관계를 유지합니다."
    }
};


export const generateAnimalAnalysis = async (animalName: string): Promise<any> => {
    if (!API_KEY) {
        console.log("Using mock data because API_KEY is not available.");
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        return Promise.resolve(mockResponse);
    }
    
    try {
        const prompt = `당신은 'MyAnimal'이라는 앱의 AI 관상 및 운세 분석가입니다. '${animalName}' 동물상에 대한 분석 결과를 생성해주세요. 결과는 반드시 한국어로, 그리고 제공된 JSON 스키마에 맞춰서 작성해야 합니다. 긍정적이고 재미있는 톤을 유지해주세요.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate animal analysis from API.");
    }
};
