import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import { download, logoShirt, stylishShirt } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'      

import{ AiPicker, ColorPicker, FilePicker, Tabs, CustomButton } from '../components'

const Customizer = () => {
    const snap = useSnapshot(state)

    const [file, setFile] = useState('')
    
    const [prompt, setPrompt] = useState('')
    const [generatingImage, setGeneratingImage] = useState(false)

    const [activeEditorTab, setActiveEditorTab] = useState("")
    const [activeFilterTab, setActiveFilterTab] = useState({
      logoShirt: true,
      stylishShirt: false,
    })

    // show tab content depending on the active tab
    const generateTabContent = () => {
      switch (activeEditorTab) {
        case "colorPicker":
          return <ColorPicker />
        case "filePicker":
          return <FilePicker
          file={file}
          setFile={setFile
            // not implemented till now..
          }
          />
        // case "aiPicker":
        //   return <AiPicker />
        default:
          return null;
      }
    }

  return (
    <AnimatePresence>
        {!snap.intro && (
            <>
              <motion.div className="absolute top-0 left-0 z-10"
              key="custom"
              {...slideAnimation('left')}
              >
                <div className='flex items-center min-h-screen'>
                    <div className='editortabs-container tabs'>
                        {EditorTabs.map((tab) => (
                            <Tabs 
                            key={tab.name}
                            tab={tab}
                            handleClick = {() => setActiveEditorTab(tab.name)}
                            />
                        ))}

                        {generateTabContent()}
                    </div>
                </div>
              </motion.div>

              <motion.div className="absolute top-5 right-5 z-10"
              {...fadeAnimation}
              >
                <CustomButton 
                    type='filled'
                    title='Take me Back'
                    handleClick={() => state.intro = true}
                    customStyles='w-fit px-4 py-3 text-sm font-bold rounded-lg'
                />
              </motion.div>

              <motion.div
              className='filtertabs-container'
              {...slideAnimation('up')}
              >
                {FilterTabs.map((tab) => (
                    <Tabs 
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab=""
                    handleClick = {() => {}}
                    />
                ))}
              </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}

export default Customizer
