import Image from "next/image";
import styles from "./NavbarStyles.module.css";
import logo from "../../public/assets/logo.svg";
import profilePicture from "../../public/assets/image-avatar.png";
import home from "../../public/assets/icon-nav-home.svg";
import movies from "../../public/assets/icon-nav-movies.svg";
import tv_series from "../../public/assets/icon-nav-tv-series.svg";
import bookmark from "../../public/assets/icon-nav-bookmark.svg";
import Link from "next/link";

function Navbar() {

  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
        <div>
          <Link href={"/"}>
            <Image src={logo} width={32} height={25} alt="logo" />
          </Link>
          <div className={styles.navComponents}>
            <Link href={"/"}><Image src={home} width={20} height={20} alt="mini" /></Link>
            <Link href={"/movies"}><Image src={movies} width={20} height={20} alt="mini" /></Link>
            <Link href={"/tv_shows"}><Image src={tv_series} width={20} height={20} alt="mini" /></Link>
            <Link href={"/bookmark"}><Image src={bookmark} width={20} height={20} alt="mini" /></Link>
          </div>
        </div>
        <Image src={profilePicture} width={40} height={40} alt="profile" />
      </div>
    </nav>
  )
}

export default Navbar;