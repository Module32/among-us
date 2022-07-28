import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
    const [playerCount, setPlayerCount] = useState(5)
    const [impCount, setImpCount] = useState(2)
    const [roleCount, setRoleCount] = useState(0)
    const [imposters, setImposters] = useState([])
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [ppl, setPpl] = useState([])
    const [taskCount, setTaskCount] = useState(0);
    const [currentName, setCurrentName] = useState('');
    const [screen, setScreen] = useState('pplCount')
    const [showRole, setShowRole] = useState(false);
    const [votes, setVotes] = useState([])
    const [role, setRole] = useState('')
    const [eject, setEject] = useState('');
    const [ejected, setEjected] = useState([]);
    const [impFound, setImpFound] = useState([]);
    const [numOfCrewAssigned, setNumOfCrewAssigned] = useState(0)

    const handleChoosePlayerRole = (index) => {

        const bigBrainAlgorithm = () => {
            if (imposters.length === impCount) {
                setRole('crew')
            } else if ((numOfCrewAssigned + 1) === playerCount - impCount) {
                setRole('imp')
                setImposters(current => [...current, currentName]);
            } else {
                const number = Math.random()
                if (number <= .4) {
                    setRole('imp')
                    setImposters(current => [...current, currentName]);
                } else {
                    setRole('crew')
                }
            }
            setNumOfCrewAssigned(numOfCrewAssigned + 1)
            setPpl(current => [...current, currentName])
            setShowRole(true)
        }

       return <div>
        <h1 className='font-medium text-red-600'>What is your name?</h1>
        <input className='focus:outline-none p-2 rounded-lg mt-4 border-solid bg-transparent border border-slate-700' placeholder='Enter name here'
        onChange={(e) => setCurrentName(e.target.value)}    
        />
        <button className='bg-red-500 mt-4 p-2 rounded-lg font-medium' onClick={() => {!showRole && bigBrainAlgorithm()}}>Show me my role</button>
        {showRole === true && <>
            <p className='text-xl mt-3'>You are: {role === 'crew' ? 'Crewmate' : 'Imposter'}</p>
            <p>{(role === 'imp' && imposters.length > 0) && `The other imposter(s): ${imposters.join(", ")}`}</p>
            <button className='bg-emerald-500 mt-4 p-2 rounded-lg font-medium' onClick={() => {
                setShowRole(false)
                if (numOfCrewAssigned === playerCount) setScreen('gameBegin')
            }}>{(numOfCrewAssigned === playerCount) ? 'Okay, let\'s begin the game!' : 'Okay, I saw my role'}</button>
        </>}
       </div>
    }

  return (<>
    <div className='flex flex-col h-screen'>
      <div className='mx-auto my-auto text-center'>
        <img src='http://assets.stickpng.com/images/61d183263a856e0004c6334a.png' width={50} className='mx-auto' />
        {screen === 'pplCount' ? <>
        <h1 className='font-bold text-3xl text-red-600'>How many people are playing?</h1>
        <input className='focus:outline-none p-2 rounded-lg mt-4 border-solid bg-transparent border border-slate-700' placeholder='Enter value here' type='number'
        onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        }}
        onChange={(e) => setPlayerCount(parseInt(e.target.value))}    
        />
        <h1 className='font-bold mt-4 text-3xl text-red-600'>How many imposters?</h1>
        <input className='focus:outline-none p-2 rounded-lg mt-4 border-solid bg-transparent border border-slate-700' placeholder='Enter value here' type='number'
        onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        }}
        onChange={(e) => setImpCount(parseInt(e.target.value))}    
        />
        <h1 className='font-bold mt-4 text-3xl text-red-600'>How many tasks?</h1>
        <input className='focus:outline-none p-2 rounded-lg mt-4 border-solid bg-transparent border border-slate-700' placeholder='Enter value here' type='number'
        onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        }}
        onChange={(e) => setTaskCount(parseInt(e.target.value))}    
        />
        <br />
        <button className='bg-red-500 mt-4 p-2 rounded-lg font-medium' onClick={() => setScreen('assignRoles')}>Begin assigning roles</button>
        </> :
        screen === 'assignRoles' ? <>
            {handleChoosePlayerRole()}
        </> : screen === 'gameBegin' ? <>
            {(impFound.length === impCount || (ppl.length - ejected.length) === (imposters.length - impFound.length + 1)) && <>
                <p>hi</p>
            </>}
            <div className="bg-[url('https://digistatement.com/wp-content/uploads/2021/03/amongus2-1.jpg')] fixed top-0 left-0 w-screen sh-creen">
                <div className='w-screen h-screen backdrop-blur flex'>
                    <div className='my-auto mx-auto'>
                        <button className='text-red-500 w-[200px] h-[200px] bg-white rounded-lg' onClick={() => setScreen('emergency')}>
                            <img src='https://ih1.redbubble.net/image.2115903932.8604/st,small,507x507-pad,600x600,f8f8f8.jpg' className={`rounded-lg ${screen === 'votingDone' && 'animate-spin'}`} width={200} />
                        </button>
                        <button className='text-red-500 w-[200px] h-[200px] bg-white m-4 rounded-lg' onClick={() => {
                            setTasksCompleted(tasksCompleted + 1)
                            if (tasksCompleted === taskCount) setScreen('crewWin')
                            }}>
                            <p className='text-2xl'>{tasksCompleted} tasks done</p>
                            <p className='text-xl'>{taskCount} tasks | {taskCount - tasksCompleted} left</p>
                        </button>
                    </div>
                </div>
            </div>
        </> : screen === 'emergency' ? <>
            <div className="bg-[url('https://digistatement.com/wp-content/uploads/2021/03/amongus2-1.jpg')] fixed top-0 left-0 w-screen sh-creen">
                <div className='w-screen h-screen backdrop-blur flex'>
                    <div className='my-auto mx-auto'>
                        <div className='bg-white w-screen text-black p-4'>
                            {ppl.map((x, index) => {
                                return <button key={index} className='py-2 px-2.5 text-xl text-left flex border border-slate-300 hover:bg-slate-200 text-black m-1 w-full rounded-lg disabled:bg-slate-200 disabled:text-gray-400 disabled:border-red-300'
                                onClick={() => {
                                    setVotes(votes.map((i, _index) => _index === index ? i += 1 : i))
                                }}
                                disabled={ejected.indexOf(x) !== -1 ? true : false}
                                >
                                    {x}
                                    <span className='ml-auto text-gray-400'>{votes[index]}</span>
                                </button>
                            })}
                            <button className='bg-red-500 text-white mt-4 p-2 rounded-lg font-medium' onClick={() => {
                                if (votes.length === 0) { setVotes(Array(5).fill(0)) } else {
                                    const result = votes.every(element => {
                                        if (element === 0) {
                                          return true;
                                        }
                                    });
                                    if (result === true) return;

                                    let max = votes.indexOf(Math.max(...votes))
                                    setEject(ppl[max])
                                    setEjected(current => [...current, ppl[max]])
                                    setScreen('votingDone')
                                }
                            }}>
                                {votes.length === 0 ? 'Start voting' : 'Conclude voting'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </> : screen === 'votingDone' ? <>
            <p className='text-2xl mt-4'>{eject} was {imposters.indexOf(eject) === -1 ? 'not' : '' } an imposter.
            <br />
            <button className='bg-red-500 text-white mt-4 p-2 rounded-lg font-medium' onClick={() => {
                                if (impFound.length === impCount) { setScreen('gameWin') } else {
                                    setVotes([])
                                    setScreen('gameBegin')
                                }
                                if (imposters.indexOf(eject) !== -1) setImpFound(current => [...current, eject])
                                console.log(impFound)
                            }}>
                                Continue game
                            </button>
            <br />
            <p></p>
            </p>
        </> : <p>This is not finished yet</p>}
      </div>
    </div>
  </>)
}
