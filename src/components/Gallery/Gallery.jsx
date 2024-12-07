import ImageCard from '../ImageCard/ImageCard';

import styles from './Gallery.module.scss';

export default function Gallery({ images, columns }) {
  return (
    <div className={styles.gallery} style={{ '--columns': columns || 3 }}>
      {images.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
