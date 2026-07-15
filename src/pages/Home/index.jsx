// صفحة الهوم - عندك تصميمها جاهز في Figma
// هنبني المحتوى الكامل (Hero + Search Bar + Top Destinations) في خطوة بناء الصفحات

import Destinations from "./Distinations/DistinationHome";
import Experience from "./experience/Experience";
import Hero from "./hero/Hero";

export default function Home() {
  return (
<>
<Hero/>
<Destinations/>
<Experience/>
</>
  );
}
