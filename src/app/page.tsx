"use client"

import Image from 'next/image'
import styles from './page.module.css'
import search_icon from "../../public/assets/icon-search.svg";
import data from "./data.json";
import movies from "../../public/assets/icon-category-movie.svg";
import tv_series from "../../public/assets/icon-category-tv.svg";
import bookmark_empty from "../../public/assets/icon-bookmark-empty.svg"
import bookmark_full from "../../public/assets/icon-bookmark-full.svg"
import { useEffect, useState } from 'react';
import play_icon from "../../public/assets/icon-play.svg";
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { JsxElement } from 'typescript';

type BookMarkType = typeof data[0];

const bookmarkAtom = atomWithStorage<BookMarkType[]>("bookmark", []);

export default function Home() {

  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const [searchedItems, setSearchedItems] = useState("");
  // const setBookmarkAtom = useSetAtom(bookmarkAtom);
  // const bookmarkValue = useAtomValue(bookmarkAtom);

  const [istrue, setIsTrue] = useState(false);

  function bookmarkItems(item: BookMarkType) {
    
    setBookmark([...bookmark, item])

  }

  function removeItem(item: BookMarkType) {
    setBookmark(bookmark.filter((datum: BookMarkType) => datum.title !== item.title));
  }

  return (
    <main className={styles.main}>
      <form>
        <label><Image src={search_icon} height={24} width={24} alt='search' /></label>
        <input placeholder='Search for movies or TV series' onChange={e => setSearchedItems(e.target.value)} />
      </form>
      { searchedItems === "" ? <div>
        <div className={styles.firstComponent}>
          <div className={styles.header}>Trending</div>
          <div className={styles.trending}>
            {data.filter(datum => datum.isTrending === true).map((datum, index) => <div key={index} className={styles.trendingShow} style={{backgroundImage: `url(${datum.thumbnail.regular.large})`, width: 470}}>
              <div className={styles.left}>
                <div className={styles.leftComponents}>
                  <span>{datum.year}</span>
                  ●
                  <Image src={datum.category === "Movie" ? movies : tv_series} height={12} width={12} alt='pic' />
                  <span>{datum.category}</span>
                  ●
                  <span>{datum.rating}</span>
                </div>
                <div className={styles.header}>{datum.title}</div>
                
              </div>
              <div className={styles.right}>
                <div onClick={bookmark.some(val => val.title.includes(datum.title)) ? () => removeItem(datum) : () => bookmarkItems(datum)}>
                <Image src={bookmark.some(val => val.title.includes(datum.title)) ? bookmark_full : bookmark_empty} width={11} height={14} alt='bookmark' />
                </div>
              </div>
            </div>)}
          </div>
        </div>

        <div className={styles.secondComponent}>
          <div className={styles.header}>Recommended for you</div>
          <div className={styles.shows}>
            {data.map((datum, index) => <div key={index} className={styles.show}>
              <div className={styles.backgroundImage} style={{ backgroundImage: `url(${datum.thumbnail.regular.large})` }}>
                <div className={styles.bookmark} onClick={bookmark.some(val => val.title.includes(datum.title)) ? () => removeItem(datum) : () => bookmarkItems(datum)}>
                    <Image src={bookmark.some(val => val.title.includes(datum.title)) ? bookmark_full : bookmark_empty} width={11} height={14} alt='bookmark' />
                  </div>

                  <div className={styles.playButton}>
                    <div>
                      <Image src={play_icon} width={30} height={30} alt='play' />
                      <div>Play</div>
                      
                    </div>
                  </div>
              </div>
              <div className={styles.boxComponents}>
                <span>{datum.year}</span>
                ●
                <Image src={datum.category === "Movie" ? movies : tv_series} width={12} height={12} alt='cat' />
                <span>{datum.category}</span>
                ●
                <span>{datum.rating}</span>
              </div>
              <div className={styles.title}>{datum.title}</div>
            </div>)}
          </div>
        </div>
      </div> : <div>
      <div className={styles.secondComponent}>
          <div className={styles.header}>Found {data.filter(datum => (datum.title).toLowerCase().includes(searchedItems.toLowerCase())).length} results for "{searchedItems}"</div>
          <div className={styles.shows}>
            {data.filter(datum => (datum.title).toLowerCase().includes(searchedItems.toLowerCase())).map((datum, index) => <div key={index} className={styles.show}>
              <div className={styles.backgroundImage} style={{ backgroundImage: `url(${datum.thumbnail.regular.large})` }}>
                <div className={styles.bookmark} onClick={bookmark.some(val => val.title.includes(datum.title)) ? () => removeItem(datum) : () => bookmarkItems(datum)}>
                    <Image src={bookmark.some(val => val.title.includes(datum.title)) ? bookmark_full : bookmark_empty} width={11} height={14} alt='bookmark' />
                  </div>

                  <div className={styles.playButton}>
                    <div>
                      <Image src={play_icon} width={30} height={30} alt='play' />
                      <div>Play</div>
                      
                    </div>
                  </div>
              </div>
              <div className={styles.boxComponents}>
                <span>{datum.year}</span>
                ●
                <Image src={datum.category === "Movie" ? movies : tv_series} width={12} height={12} alt='cat' />
                <span>{datum.category}</span>
                ●
                <span>{datum.rating}</span>
              </div>
              <div className={styles.title}>{datum.title}</div>
            </div>)}
          </div>
        </div>
      </div> }
    </main> 
  )
}

