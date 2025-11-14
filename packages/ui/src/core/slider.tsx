import { FC } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import { ArrowIcon } from "../icons/arrow";
import { cn } from "../utils/class-names";

interface Props {
    id: string;
    slides: string[];
    slideClassName?: string;
    onSlideChange: (activeIndex: number) => void;
}

export const Slider: FC<Props> = ({ id, slides, slideClassName, onSlideChange }) => {
    const renderSlide = (item: string, i: number) => (
        <SwiperSlide
            key={i + id}
            className={cn("text-secondary_text px-10 text-center text-lg", slideClassName)}
        >
            {item}
        </SwiperSlide>
    );

    const onChangeSlide = ({ activeIndex }: SwiperClass) => onSlideChange(activeIndex);

    const prevId = `${id}-prev`;
    const nextId = `${id}-next`;

    return (
        <div className="relative w-full max-w-lg">
            <Swiper
                id={id}
                navigation={{ enabled: true, nextEl: `#${nextId}`, prevEl: `#${prevId}` }}
                modules={[Navigation]}
                loop
                onSlideChange={onChangeSlide}
            >
                {slides.map(renderSlide)}
            </Swiper>

            <div className="absolute top-1/2 left-0 z-10 flex w-full -translate-y-1/2 items-center justify-between gap-6">
                <div id={prevId} className="slider-prev group cursor-pointer">
                    <ArrowIcon
                        className="text-secondary_text group-hover:text-primary_text rotate-180"
                        width={20}
                        height={20}
                    />
                </div>
                <div id={nextId} className="slider-next group cursor-pointer">
                    <ArrowIcon
                        className="text-secondary_text group-hover:text-primary_text"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </div>
    );
};
