import React from 'react'
import { motion, AnimatePresence } from'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { CustomButton } from '../components'
import {
    headTextAnimation,
    slideAnimation,
    headContainerAnimation,
    headContentAnimation,
 } from '../config/motion'

const Home = () => {
    const snap = useSnapshot(state)

  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header className="header" {...slideAnimation('down')}>
                    <img src="./threejs.png" alt="logo"
                    className='w-8 h-8 object-contain'
                     />
                </motion.header>
                <motion.div className="home-content" {...headContainerAnimation}>
                    <motion.div className="" {...headTextAnimation}>
                        <h1 className='head-text'>
                            LET'S <br className='xl:block hidden '/> DO IT.
                        </h1>
                    </motion.div>
                    <motion.div className="flex flex-col gap-5" {...headContentAnimation}>
                        <p className='max-wd-md font-normal text-neutral-600 text-base font-2xl'>
                            Create your unique and exclusive shirt with a brand-new 3D customization tool. <strong>Unleash your creativity</strong>{" "} and define your own style.
                        </p>

                        <CustomButton
                        type='filled'
                        title='customize it'
                        handleClick = {() => state.intro = false} // no home page
                        customStyles = 'w-fit px-4 py-2.5 font-bold text-sm'
                        />

                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home
