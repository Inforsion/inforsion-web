"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChartPie, ShieldCheck, TabletSmartphone } from "lucide";
import { Icon, IconNode } from "lucide-react";

interface FeatureProps {
  icon: IconNode;
  title: string;
  description: string;
  delay: number;
}

const InforsionLanding: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // 스크롤 애니메이션을 위한 transform 값들
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: TabletSmartphone as IconNode,
      title: "모바일 최적화",
      description:
        "언제 어디서나 스마트폰으로 간편하게 매출을 확인하고 관리하세요",
      delay: 0,
    },
    {
      icon: ChartPie as IconNode,
      title: "실시간 분석",
      description:
        "매출 데이터를 실시간으로 분석하여 비즈니스 인사이트를 제공합니다",
      delay: 0.2,
    },
    {
      icon: ShieldCheck as IconNode,
      title: "안전한 관리",
      description:
        "소중한 매출 데이터를 안전하게 보호하며 체계적으로 관리합니다",
      delay: 0.4,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* 메인 히어로 섹션 */}
      <motion.section
        className="relative h-screen flex items-center justify-center bg-gradient-to-br bg-primary-700"
        style={{ y: backgroundY }}
      >
        {/* 배경 장식 요소들 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"
            animate={{
              x: [0, -40, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          className="relative text-center -z-0 px-6 max-w-xl w-full mx-auto bg-primary-700 p-20"
          style={{ y: textY }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight text-left"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            언제
            <br />
            어디서나
            <br />
            쉽고 간편한
            <br />
            가게관리
          </motion.h1>

          {/* 아이콘 */}
          <motion.div
            className="flex justify-center mb-16 "
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-2xl flex items-end justify-end  w-full">
              <Image
                src={"/inforsion-logo-color.png"}
                alt={"인포젼 로고"}
                width={200}
                height={200}
                className={"w-32 h-32 object-contain"}
              />
            </div>
          </motion.div>

          <motion.button
            className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            지금 시작하기
          </motion.button>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 두 번째 섹션 - 메인 메시지 */}
      <motion.section className="relative py-32 bg-white z-30 ">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            언제 어디서나
            <br />
            쉽고 간편한
            <br />
            <span className="text-blue-600">가게 관리</span>를<br />
            Inforsion이 만들어드립니다
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            소상공인을 위한 스마트한 카페 매출 관리 서비스로
            <br />
            복잡한 관리업무를 간단하게, 언제 어디서나 편리하게
          </motion.p>
        </div>
      </motion.section>

      {/* 특징 섹션 */}
      <section className="relative py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            왜 Inforsion을 선택해야 할까요?
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <motion.section className="relative py-32 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h3
            className="text-3xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            지금 바로 시작해보세요
          </motion.h3>

          <motion.p
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            간편한 가게 관리, 더 이상 미루지 마세요.
            <br />
            Inforsion과 함께 스마트한 비즈니스를 시작하세요.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료로 시작하기
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              더 알아보기
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* 푸터 */}
      <footer className="relative py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Inforsion
          </motion.div>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            소상공인을 위한 스마트한 카페 매출 관리 서비스
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

// 특징 카드 컴포넌트
const FeatureCard: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Icon iconNode={icon} className="text-4xl mb-6" color={"#006FFD"} />
      <h4 className="text-xl font-bold text-gray-800 mb-4">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default InforsionLanding;
