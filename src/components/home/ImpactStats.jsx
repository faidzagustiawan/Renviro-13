import { useState, useEffect } from 'react'
import { FiUsers, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

const ImpactStats = () => {
  const [countVolunteers, setCountVolunteers] = useState(0)
  const [countFunds, setCountFunds] = useState(0)
  const [countProjects, setCountProjects] = useState(0)
  
  // Animasi penghitung
  useEffect(() => {
    const targetVolunteers = 5000
    const targetFunds = 350 
    const targetProjects = 70
    
    const durationVolunteers = 2000
    const durationFunds = 2500
    const durationProjects = 1800
    
    const stepVolunteers = Math.ceil(targetVolunteers / (durationVolunteers / 16))
    const stepFunds = Math.ceil(targetFunds / (durationFunds / 16))
    const stepProjects = Math.ceil(targetProjects / (durationProjects / 16))
    
    const intervalVolunteers = setInterval(() => {
      setCountVolunteers(prev => {
        if (prev + stepVolunteers >= targetVolunteers) {
          clearInterval(intervalVolunteers)
          return targetVolunteers
        }
        return prev + stepVolunteers
      })
    }, 16)
    
    const intervalFunds = setInterval(() => {
      setCountFunds(prev => {
        if (prev + stepFunds >= targetFunds) {
          clearInterval(intervalFunds)
          return targetFunds
        }
        return prev + stepFunds
      })
    }, 16)
    
    const intervalProjects = setInterval(() => {
      setCountProjects(prev => {
        if (prev + stepProjects >= targetProjects) {
          clearInterval(intervalProjects)
          return targetProjects
        }
        return prev + stepProjects
      })
    }, 16)
    
    return () => {
      clearInterval(intervalVolunteers)
      clearInterval(intervalFunds)
      clearInterval(intervalProjects)
    }
  }, [])
  
  return (
    <section className="py-16 bg-primary-50 dark:bg-primary-900/20">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Relawan */}
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="rounded-full bg-primary-100 dark:bg-primary-800 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiUsers className="h-8 w-8 text-primary-600 dark:text-primary-300" />
            </div>
            <h3 className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-2">
              {countVolunteers.toLocaleString('id-ID')}+
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">Relawan</p>
          </div>
          
          {/* Dana Terkumpul */}
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="rounded-full bg-primary-100 dark:bg-primary-800 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiDollarSign className="h-8 w-8 text-primary-600 dark:text-primary-300" />
            </div>
            <h3 className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-2">
              Rp {countFunds}Jt+
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">Dana Terkumpul</p>
          </div>
          
          {/* Proyek */}
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="rounded-full bg-primary-100 dark:bg-primary-800 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="h-8 w-8 text-primary-600 dark:text-primary-300" />
            </div>
            <h3 className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-2">
              {countProjects}+
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">Proyek Terdanai</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactStats