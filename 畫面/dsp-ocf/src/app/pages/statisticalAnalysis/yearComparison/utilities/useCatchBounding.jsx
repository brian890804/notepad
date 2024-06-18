import { useEffect, useState } from 'react';

export default containerRef => {
	// ref跟位置資訊ˋ
	const [boundDistance, setBoundDistance] = useState();
	// 觸發上方Card 的 postion sticky跟 換外觀
	const [trigger, setTrigger] = useState(false);
	useEffect(() => {
		if (containerRef?.current) {
			setBoundDistance({
				toTop: containerRef.current.offsetTop,
				height: containerRef.current.scrollHeight,
			});
		}
	}, [containerRef?.current]);

	useEffect(() => {
		const targetElement = document.querySelector('.home__body');
		const scrollEvent = () => {
			if (boundDistance) {
				if (targetElement.scrollTop <= boundDistance.height + boundDistance.toTop + 550) {
					setTrigger(false);
				} else if (targetElement.scrollTop > boundDistance.height + boundDistance.toTop + 600) {
					setTrigger(true);
				} else {
					setTrigger(false);
				}
			}
		};
		targetElement.addEventListener('scroll', scrollEvent);
		return () => {
			targetElement.removeEventListener('scroll', scrollEvent);
		};
	}, [boundDistance]);

	return { trigger };
};
