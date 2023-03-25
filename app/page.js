// next 13
// beta.nextjs.org
// lot of improvements since next 12
// but 13 still has a bunch of bugs...


import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
    <div className={styles.main}>
      <form action="/send-data-here" method="post">
        <label for="user_input">Domain:</label>
        <input type="text" id="first" name="first" />
        <button type="submit">Submit</button>
      </form>
    </div>
    </main>
  )
}