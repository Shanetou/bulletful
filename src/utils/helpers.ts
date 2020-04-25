import React from "react";
import { Bullet, BulletType, ServerBullet } from "../Bullet";

export const serverBulletToBulletNode = (bullet: any) => {
  return {
    ...bullet,
    childrenIds: bullet.children,
  };
};

const bulletsForChildren = (
  bulletsById: Map<string, ServerBullet>,
  childrenBulletIds: string[]
): any[] => {
  return childrenBulletIds.map((bulletId: string) => {
    const bulletForId = bulletsById.get(bulletId);

    if (bulletForId) {
      if (bulletForId.children.length === 0) {
        return serverBulletToBulletNode(bulletForId);
      } else {
        return {
          ...bulletForId,
          children: bulletsForChildren(bulletsById, bulletForId.children),
        };
      }
    } else {
      throw new Error("No bullet for ID!");
    }
  });
};

// create master root bullet on initialization
export const bulletTree = (bulletsById: Map<string, ServerBullet>) => {
  const bulletsArray = Array.from(bulletsById.values());

  const rootBullets = bulletsArray.filter((bullet) => {
    return !bullet.parentId;
  });

  return rootBullets.map((bullet) => {
    if (bullet.children.length === 0) {
      return serverBulletToBulletNode(bullet);
    } else {
      return {
        ...bullet,
        children: bulletsForChildren(bulletsById, bullet.children),
      };
    }
  });
};
