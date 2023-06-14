import { HomeBackground } from '@/canvas/HomeBackground';
import { Card } from '@/components/Card';
import { ScrollAnimate } from '@/components/ScrollAnimate';
import { Link } from '@/components/ui/Link';
import works from '../data/works.json';

export default function Home() {
  return (
    <HomeBackground>
      <section className="absolute w-[200vw] h-screen pt-32 pb-24">
        <div className="relative w-full h-full">
          <h2 id="about" className="absolute w-[95vw] top-0 left-2 md:left-8 lg:left-16 text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider leading-tight font-thin">
            {'HI 👋, MY NAME IS FELIPE AND I\'M A MOBILE DEVOLPER FROM BRAZIL, PASSIONATED ABOUT CREATING MEMORABLE PROJECTS'}
          </h2>

          <p className="absolute bottom-0 left-[90vw] w-[90vw] text-2xl lg:text-4xl xl:text-5xl uppercase tracking-wider leading-tight font-thin">
            {'I am a mobile developer specialized in React Native, constantly seeking learning and professional growth in creating high-quality applications for iOS and Android.'}
          </p>

          <p className="absolute top-0 left-[110vw] w-[85vw] text-3xl lg:text-5xl xl:text-6xl text-end uppercase tracking-wider leading-tight font-thin">
            {'I always strive to learn and apply new tools and techniques to provide innovative solutions to clients and enhance the end-user experience.'}
          </p>

        </div>

        <div className="absolute bottom-24 left-2 md:left-8 lg:left-16 w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32 -rotate-90 flex justify-center items-center">
          <ScrollAnimate />
        </div>
      </section>

      <section
        id="work"
        className="absolute flex gap-4 md:gap-20 lg:gap-24 w-[300vw] md:w-[200vw] lg:w-[100vw] h-screen left-[200vw] pt-32 pb-4 px-6"
      >
        {works.map((work, index) => (
          <Card
            href={`/work/details/${index}`}
            index={index}
            image={`/${index + 1}.png`}
            title={work.title}
            description={work.short_description}
          />
        ))}
      </section>

      <section className="flex flex-col justify-between absolute w-[100vw] h-screen left-[500vw] md:left-[400vw] lg:left-[300vw] pl-[5vw] pt-32 pb-24">
        <div>
          <p id="talk" className="text-5xl md:text-7xl xl:text-8xl w-[90vw] text-end mb-8 font-light">
            {'LET\'S CREATE SOMETHING AWESOME TOGETHER'}
          </p>

          <p className="text-xl md:text-2xl xl:text-3xl w-[90vw] uppercase items-end font-extralight">
            {'Once you free your mind about a concept of harmony and of design being correct you can do whatever you want. Drop me an email to make your project a memorable experience.'}
          </p>
        </div>

        <div className="flex w-[90vw] justify-between">
          <Link className="text-2xl" href="mailto:iamfelipelima10@gmail.com" title="Contact me →" />

          <div className="flex flex-col items-end">
            <Link href={'https://www.linkedin.com/in/iamfelima/'} title={'LINKEDIN'} target="_blank" />
            <Link href={'https://github.com/iamlipe'} title={'GITHUB'} target="_blank" />
            <Link href={'https://twitter.com/iam_felima'} title={'TWITTER'} target="_blank" />
          </div>
        </div>
      </section>
    </HomeBackground>
  );
}
