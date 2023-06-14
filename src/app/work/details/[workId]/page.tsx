import { WorkBackground } from '@/canvas/WorkBackground';
import { Link } from '@/components/ui/Link';
import works from '@/data/works.json';
import Image from 'next/image';
import { useMemo } from 'react';

interface WorkDetailsProps {
  params: {
    workId: string
  }
}

function WorkDetails({ params }: WorkDetailsProps) {
  const { workId } = params;

  const work = useMemo(() => works[Number(workId)], [workId]);

  return (
    <WorkBackground>
      <section className="absolute flex flex-col xl:flex-row gap-4 w-screen h-[100vh] pt-32 pb-24 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col">
          <div className="flex flex-col xl:flex-row gap-4 mb-4">
            <div className="">
              <div className="flex flex-row justify-between">
                <div className="w-60 xl:w-80 h-60 xl:h-80 bg-black mb-4">
                  <Image
                    width={320}
                    height={320}
                    src={work.logo}
                    alt={'logo'}
                  />
                </div>

                <span className="gold-text text-6xl ml-4">
                  {`⌗00${Number(workId) + 1}`}
                </span>

              </div>

            </div>

            <div className="flex flex-col justify-end items-end">
              <h3 className="text-3xl md:text-4xl xl:text-5xl uppercase tracking-wider leading-tight font-light mb-4">
                {work.title}
              </h3>
              <p className="text-base md:text-lg xl:text-xl uppercase font-extralight text-end">
                {work.description}
              </p>
            </div>
          </div>

          <p className="text-base mb-4">technologies</p>
          <div className="flex items-start justify-start w-60 xl:w-80 gap-2 flex-wrap">
            {work.tecnologies.map((tech) => <span className="text-sm font-light whitespace-nowrap leading-3">{`#${tech}`}</span>)}
          </div>

        </div>

        <div className="flex flex-col items-end justify-end w-full xl:w-1/3">
          {work.repo ? <Link href={work.repo} title={'REPOSITORY'} target="_blank" /> : null}
          {work.url ? <Link href={work.url} title={'SEE MORE'} target="_blank" /> : null}
        </div>
      </section>
    </WorkBackground>
  );
}

export default WorkDetails;
