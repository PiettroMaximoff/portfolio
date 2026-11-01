import type { ReactNode } from "react";

type ProjectPlaceholderProps = {
  /** Слаг определяет вариант макета, чтобы заглушки у соседних проектов различались. */
  slug: string;
  className?: string;
  /** Если не задан, картинка декоративная. */
  label?: string;
};

const INK = "#1c1b18";
const SCREEN = "#fffcf7";
const SOFT = "rgba(28,27,24,0.07)";
const MID = "rgba(28,27,24,0.16)";

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  fill?: string;
};

function Box({ x, y, w, h, r = 6, fill = MID }: BoxProps) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />;
}

const VARIANTS = 4;

/** djb2: стабильный и достаточно равномерный, чтобы соседние слаги получали разные макеты. */
function variantOf(slug: string) {
  let hash = 5381;
  for (const char of slug) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return hash % VARIANTS;
}

/** Четыре макета абстрактного сайта на экране моноблока: hero, карточки, дашборд, каталог. */
function Site({ variant, x, y }: { variant: number; x: number; y: number }): ReactNode {
  const header = (
    <>
      <Box x={x + 36} y={y + 30} w={46} h={16} r={5} fill={INK} />
      <Box x={x + 600} y={y + 34} w={52} h={8} r={4} />
      <Box x={x + 668} y={y + 34} w={52} h={8} r={4} />
      <Box x={x + 736} y={y + 34} w={52} h={8} r={4} />
      <Box x={x + 840} y={y + 26} w={52} h={24} r={12} fill={INK} />
    </>
  );

  if (variant === 0) {
    return (
      <>
        {header}
        <Box x={x + 36} y={y + 120} w={330} h={26} r={8} fill={INK} />
        <Box x={x + 36} y={y + 160} w={250} h={26} r={8} fill={INK} />
        <Box x={x + 36} y={y + 214} w={380} h={10} r={5} />
        <Box x={x + 36} y={y + 238} w={340} h={10} r={5} />
        <Box x={x + 36} y={y + 262} w={290} h={10} r={5} />
        <Box x={x + 36} y={y + 306} w={130} h={38} r={19} fill={INK} />
        <Box x={x + 520} y={y + 100} w={372} h={270} r={22} fill={SOFT} />
        <circle cx={x + 706} cy={y + 235} r={62} fill={MID} />
        <path d={`M${x + 690} ${y + 205}l46 30-46 30z`} fill={SCREEN} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Box x={x + 36 + i * 300} y={y + 410} w={272} h={110} r={16} fill={SOFT} />
            <Box x={x + 56 + i * 300} y={y + 430} w={34} h={34} r={10} fill={MID} />
            <Box x={x + 56 + i * 300} y={y + 482} w={150} h={9} r={4} />
          </g>
        ))}
      </>
    );
  }

  if (variant === 1) {
    return (
      <>
        {header}
        <Box x={x + 214} y={y + 110} w={500} h={28} r={8} fill={INK} />
        <Box x={x + 284} y={y + 152} w={360} h={28} r={8} fill={INK} />
        <Box x={x + 254} y={y + 208} w={420} h={10} r={5} />
        <Box x={x + 304} y={y + 232} w={320} h={10} r={5} />
        <Box x={x + 394} y={y + 278} w={140} h={38} r={19} fill={INK} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Box x={x + 36 + i * 300} y={y + 366} w={272} h={150} r={16} fill={SOFT} />
            <circle cx={x + 80 + i * 300} cy={y + 412} r={22} fill={MID} />
            <Box x={x + 60 + i * 300} y={y + 456} w={170} h={10} r={5} />
            <Box x={x + 60 + i * 300} y={y + 480} w={120} h={10} r={5} />
          </g>
        ))}
      </>
    );
  }

  if (variant === 3) {
    return (
      <>
        {header}
        <Box x={x + 36} y={y + 96} w={200} h={22} r={8} fill={INK} />
        {[0, 1, 2, 3].map((i) => (
          <Box key={i} x={x + 36 + i * 86} y={y + 140} w={72} h={28} r={14} fill={i === 0 ? INK : MID} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Box x={x + 36 + i * 222} y={y + 196} w={204} h={190} r={16} fill={SOFT} />
            <circle cx={x + 138 + i * 222} cy={y + 288} r={42} fill={MID} />
            <Box x={x + 36 + i * 222} y={y + 402} w={150} h={10} r={5} />
            <Box x={x + 36 + i * 222} y={y + 426} w={70} h={14} r={6} fill={INK} />
          </g>
        ))}
        <Box x={x + 36} y={y + 470} w={856} h={50} r={14} fill={SOFT} />
      </>
    );
  }

  return (
    <>
      <Box x={x + 24} y={y + 24} w={150} h={500} r={16} fill={SOFT} />
      <Box x={x + 44} y={y + 46} w={46} h={16} r={5} fill={INK} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} x={x + 44} y={y + 100 + i * 40} w={i === 1 ? 110 : 90} h={10} r={5} fill={i === 1 ? INK : MID} />
      ))}
      <Box x={x + 206} y={y + 30} w={200} h={22} r={8} fill={INK} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={x + 206 + i * 232} y={y + 84} w={212} h={96} r={14} fill={SOFT} />
          <Box x={x + 224 + i * 232} y={y + 104} w={80} h={9} r={4} />
          <Box x={x + 224 + i * 232} y={y + 130} w={110} h={22} r={7} fill={INK} />
        </g>
      ))}
      <Box x={x + 206} y={y + 206} w={440} h={310} r={14} fill={SOFT} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Box key={i} x={x + 238 + i * 56} y={y + 470 - [90, 150, 110, 200, 170, 230, 190][i]} w={32} h={[90, 150, 110, 200, 170, 230, 190][i]} r={8} fill={i === 5 ? INK : MID} />
      ))}
      <Box x={x + 666} y={y + 206} w={228} h={310} r={14} fill={SOFT} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={x + 700} cy={y + 248 + i * 58} r={14} fill={MID} />
          <Box x={x + 726} y={y + 238 + i * 58} w={130} h={9} r={4} />
          <Box x={x + 726} y={y + 256 + i * 58} w={90} h={9} r={4} />
        </g>
      ))}
    </>
  );
}

/** Тот же макет, упрощённый, на экране смартфона. */
function PhoneSite({ variant, x, y }: { variant: number; x: number; y: number }): ReactNode {
  return (
    <>
      <Box x={x + 20} y={y + 24} w={34} h={12} r={4} fill={INK} />
      <Box x={x + 168} y={y + 24} w={44} h={12} r={4} />
      {variant === 3 ? (
        <>
          <Box x={x + 20} y={y + 76} w={120} h={18} r={7} fill={INK} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Box x={x + 20 + (i % 2) * 98} y={y + 114 + Math.floor(i / 2) * 150} w={90} h={136} r={12} fill={SOFT} />
              <circle cx={x + 65 + (i % 2) * 98} cy={y + 168 + Math.floor(i / 2) * 150} r={24} fill={MID} />
              <Box x={x + 30 + (i % 2) * 98} y={y + 216 + Math.floor(i / 2) * 150} w={60} h={8} r={4} />
              <Box x={x + 30 + (i % 2) * 98} y={y + 232 + Math.floor(i / 2) * 150} w={34} h={10} r={5} fill={INK} />
            </g>
          ))}
        </>
      ) : variant === 2 ? (
        <>
          {[0, 1].map((i) => (
            <Box key={i} x={x + 20 + i * 98} y={y + 70} w={90} h={64} r={12} fill={SOFT} />
          ))}
          <Box x={x + 20} y={y + 152} w={188} h={150} r={12} fill={SOFT} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Box key={i} x={x + 34 + i * 34} y={y + 280 - [40, 80, 60, 100, 76][i]} w={20} h={[40, 80, 60, 100, 76][i]} r={6} fill={i === 3 ? INK : MID} />
          ))}
        </>
      ) : (
        <>
          <Box x={x + 20} y={y + 76} w={168} h={20} r={7} fill={INK} />
          <Box x={x + 20} y={y + 106} w={120} h={20} r={7} fill={INK} />
          <Box x={x + 20} y={y + 148} w={188} h={9} r={4} />
          <Box x={x + 20} y={y + 168} w={150} h={9} r={4} />
          <Box x={x + 20} y={y + 200} w={92} h={30} r={15} fill={INK} />
          <Box x={x + 20} y={y + 260} w={188} h={96} r={14} fill={SOFT} />
        </>
      )}
      {variant !== 3 &&
        [0, 1].map((i) => <Box key={i} x={x + 20 + i * 98} y={y + 376} w={90} h={70} r={12} fill={SOFT} />)}
    </>
  );
}

export function ProjectPlaceholder({ slug, className, label }: ProjectPlaceholderProps) {
  const variant = variantOf(slug);

  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* Моноблок */}
      <rect x="160" y="124" width="1000" height="650" rx="36" fill={INK} opacity="0.1" transform="translate(0 14)" />
      <rect x="160" y="110" width="1000" height="650" rx="36" fill={INK} />
      <rect x="188" y="138" width="944" height="548" rx="14" fill={SCREEN} />
      <path d="M600 760h120l24 70H576Z" fill="#2c2a26" />
      <rect x="500" y="826" width="320" height="24" rx="12" fill={INK} />
      <Site variant={variant} x={188} y={138} />

      {/* Смартфон */}
      <rect x="1104" y="334" width="252" height="504" rx="44" fill={INK} opacity="0.1" transform="translate(0 14)" />
      <rect x="1104" y="320" width="252" height="504" rx="44" fill={INK} />
      <rect x="1116" y="332" width="228" height="480" rx="34" fill={SCREEN} />
      <rect x="1196" y="344" width="68" height="16" rx="8" fill={INK} />
      <PhoneSite variant={variant} x={1116} y={346} />
    </svg>
  );
}
