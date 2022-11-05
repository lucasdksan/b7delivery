
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";


import "swiper/css";
import styles from "./styles.module.css";

const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                className={styles.swiper}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop
                modules={[Autoplay]}
            >
                <SwiperSlide className={styles.slide}>
                    <div className={styles.bannerImg}>1</div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.bannerImg}>2</div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.bannerImg}>3</div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.bannerImg}>4</div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;