import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';

import styles from './download.module.css';
import {
  DownloadIcon,
  ErrorIcon,
  BuildIcon
} from '../components/DownloadIcons';

// 移动端Hero组件
function MobileHeroSection() {
  return (
    <section className={styles.mobileHero}>
      <div className={styles.mobileHeroContent}>
        <div className={styles.mobileHeroTitle}>
          <h1 className={styles.mobileTitleMain}>
            <Translate>下载 Invero</Translate>
          </h1>
          <p className={styles.mobileHeroSubtitle}>
            <Translate>获取最新版本的 Invero 插件，开始创建你的自定义界面</Translate>
          </p>
        </div>

        {/* 标签 */}
        <div className={styles.mobileHeroTags}>
          <span className={styles.mobileTag}>
            <span className={styles.mobileTagIcon}>📦</span>
            <Translate>多版本支持</Translate>
          </span>
          <span className={styles.mobileTag}>
            <span className={styles.mobileTagIcon}>🚀</span>
            <Translate>快速下载</Translate>
          </span>
          <span className={styles.mobileTag}>
            <span className={styles.mobileTagIcon}>🔄</span>
            <Translate>更新检查</Translate>
          </span>
        </div>

        {/* 操作按钮 */}
        <div className={styles.mobileHeroActions}>
          <Link className={styles.mobileActionButton} to="/docs/about">
            <span className={styles.mobileActionIcon}>📖</span>
            <span className={styles.mobileActionText}>
              <Translate>查看文档</Translate>
            </span>
          </Link>
          <a
            className={styles.mobileActionButton}
            href="https://github.com/iiabc/Invero"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.mobileActionIcon}>💻</span>
            <span className={styles.mobileActionText}>
              <Translate>GitHub</Translate>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// 桌面端Hero区域 - 采用主页面的左右分栏布局
function DesktopHeroSection({ activeVersion, setActiveVersion, releases, isLoading, error }) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 筛选版本
  const filteredReleases = releases.filter(release => {
    if (activeVersion === 'all') return true;
    if (activeVersion === 'stable') return !release.prerelease;
    if (activeVersion === 'preview') return release.prerelease;
    if (activeVersion === 'dev') return false; // 开发版构建不显示release列表
    return true;
  });

  return (
    <section className={styles.hero}>
      {/* 背景粒子动画 */}
      <div className={styles.heroBackground}>
        <div
          className={styles.backgroundParticles}
          style={{
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{ '--delay': `${i * 0.5}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* 左侧侧边栏 */}
      <div className={styles.heroLeft}>
        {/* 标题 */}
        <div className={styles.logoTitleSection}>
          <div className={styles.heroTitle}>
            <span className={styles.titleMain}>
              <Translate>下载 Invero</Translate>
            </span>
          </div>
        </div>

        {/* 介绍 */}
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>
            <Translate>获取最新版本的 Invero 插件，开始创建你的自定义界面</Translate>
          </p>

          {/* 标签 */}
          <div className={styles.heroTags}>
            <span className={styles.tag}>
              <span className={styles.tagIcon}>📦</span>
              <Translate>多版本支持</Translate>
            </span>
            <span className={styles.tag}>
              <span className={styles.tagIcon}>🚀</span>
              <Translate>快速下载</Translate>
            </span>
            <span className={styles.tag}>
              <span className={styles.tagIcon}>🔄</span>
              <Translate>更新检查</Translate>
            </span>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className={styles.heroActions}>
          <Link className={styles.actionLink} to="/docs/about">
            <div className={styles.actionIcon}>📖</div>
            <div className={styles.actionContent}>
              <span className={styles.actionText}>
                <Translate>查看文档</Translate>
              </span>
              <span className={styles.actionDesc}>
                <Translate>了解如何使用</Translate>
              </span>
            </div>
            <div className={styles.actionArrow}>→</div>
          </Link>
          <a className={styles.actionLink} href="https://github.com/iiabc/Invero" target="_blank" rel="noopener noreferrer">
            <div className={styles.actionIcon}>💻</div>
            <div className={styles.actionContent}>
              <span className={styles.actionText}>
                <Translate>GitHub 仓库</Translate>
              </span>
              <span className={styles.actionDesc}>
                <Translate>查看源代码</Translate>
              </span>
            </div>
            <div className={styles.actionArrow}>↗</div>
          </a>
        </div>
      </div>

      {/* 右侧滚动内容 */}
      <div className={styles.heroRight}>
        <div className={styles.cardsContainer}>
          <div className={styles.cardsHeader}>
            <h3 className={styles.cardsTitle}>
              <Translate>版本发布</Translate>
            </h3>
            <div className={styles.cardsTitleLine}></div>
          </div>

          <VersionToggle
            activeVersion={activeVersion}
            setActiveVersion={setActiveVersion}
          />

          {activeVersion === 'stable' && (
            <p className={styles.versionDescription}>
              <Translate>稳定版本经过全面测试，适合用于生产环境</Translate>
            </p>
          )}
          {activeVersion === 'preview' && (
            <p className={styles.versionDescription}>
              <Translate>预览版本包含最新功能，但可能存在稳定性问题</Translate>
            </p>
          )}
          {activeVersion === 'dev' && (
            <p className={styles.versionDescription}>
              <Translate>开发版构建包含最新的代码更改，适合开发者测试新功能</Translate>
            </p>
          )}
          {activeVersion === 'all' && (
            <p className={styles.versionDescription}>
              <Translate>查看所有可用的版本，包括稳定版和预览版</Translate>
            </p>
          )}

          {activeVersion === 'dev' ? (
            <DevelopmentBuildGrid />
          ) : isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : filteredReleases.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={styles.releaseGrid}>
              {filteredReleases.map(release => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



function FileCard({ asset }) {
  return (
    <div className={styles.fileCard}>
      <div className={styles.fileIcon}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fileIconSvg}>
          <path d="M13 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9M13 2L20 9M13 2V9H20M12 18V12M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className={styles.fileInfo}>
        <div className={styles.fileName}>{asset.name}</div>
        <div className={styles.fileSize}>{(asset.size / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      <a
        href={asset.browser_download_url}
        className={styles.downloadButton}
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.downloadIcon}>
          <path d="M12 15L12 3M12 15L8 11M12 15L16 11M21 15V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

function ReleaseCard({ release }) {
  const date = new Date(release.published_at).toLocaleDateString();
  const assets = release.assets || [];
  const jarAssets = assets.filter(asset => asset.name.endsWith('.jar'));

  return (
    <div className={styles.releaseCard}>
      <div className={styles.releaseHead}>
        <div className={styles.releaseDetails}>
          <div className={styles.releaseName}>{release.name || release.tag_name}</div>
          <div className={styles.releaseInfo}>
            <div className={styles.releaseDate}>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.releaseDateIcon}>
                <path d="M6 5V1M14 5V1M5 9H15M19 7V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V7C1 5.89543 1.89543 5 3 5H17C18.1046 5 19 5.89543 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {date}
            </div>
          </div>
        </div>
        <div className={styles.releaseActions}>
          <a
            href={release.html_url}
            className={styles.viewDetailsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate>查看详情</Translate>
          </a>
        </div>
      </div>

      {jarAssets.length > 0 && (
        <div className={styles.releaseFiles}>
          {jarAssets.map(asset => (
            <FileCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      {jarAssets.length === 0 && (
        <div className={styles.noFiles}>
          <div className={styles.noFilesIcon}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H12L10 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.89 21.11 6 20 6ZM20 18H4V6H9.17L11.17 8H20V18ZM12 14H14V16H16V14H18V12H16V10H14V12H12V14Z" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.noFilesText}>
            <Translate>该版本没有可用的下载文件</Translate>
          </div>
          <a
            href={release.zipball_url}
            className={styles.sourceCodeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate>下载源代码</Translate>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.sourceCodeIcon}>
              <path d="M7 10L5 8M5 8L7 6M5 8H15M13 14L15 16M15 16L17 14M15 16V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

// PC端开发版构建网格组件
function DevelopmentBuildGrid() {
  const [builds, setBuilds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBuilds = async (pageNum = 1, append = false) => {
    if (pageNum === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      // 获取构建信息
      const response = await fetch(`https://api.github.com/repos/iiabc/Invero/actions/runs?per_page=20&page=${pageNum}`);

      if (!response.ok) {
        throw new Error('获取GitHub Actions数据失败');
      }

      const data = await response.json();

      // 过滤出工作流名称包含"Plugin Build"的构建
      const pluginBuilds = data.workflow_runs
        .filter(run => run.name && run.name.includes('Plugin Build'))
        .slice(0, 10);

      // 获取每个构建的提交信息
      const buildsWithCommits = await Promise.all(
        pluginBuilds.map(async (run) => {
          let commitMessage = '获取提交信息失败';
          try {
            // 获取提交信息
            const commitResponse = await fetch(`https://api.github.com/repos/iiabc/Invero/commits/${run.head_sha}`);
            if (commitResponse.ok) {
              const commitData = await commitResponse.json();
              commitMessage = commitData.commit.message.split('\n')[0]; // 只取第一行
              // 限制长度
              if (commitMessage.length > 60) {
                commitMessage = commitMessage.substring(0, 60) + '...';
              }
            }
          } catch (commitErr) {
            console.warn('获取提交信息失败:', commitErr);
          }

          return {
            id: run.id,
            name: run.name || `构建 #${run.run_number}`,
            number: run.run_number,
            branch: run.head_branch || 'unknown',
            date: new Date(run.created_at).toLocaleDateString(),
            status: run.conclusion || 'pending',
            downloadUrl: `https://github.com/iiabc/Invero/actions/runs/${run.id}`,
            commitMessage,
            commitSha: run.head_sha?.substring(0, 7) || 'unknown'
          };
        })
      );

      if (append) {
        setBuilds(prev => [...prev, ...buildsWithCommits]);
      } else {
        setBuilds(buildsWithCommits);
      }

      // 检查是否还有更多数据
      setHasMore(buildsWithCommits.length === 10);

      if (buildsWithCommits.length === 0 && pageNum === 1) {
        setError(translate({
          id: 'download.error.noBuildsFound',
          message: '未找到可用的构建。请访问 GitHub Actions 页面查看最新构建。'
        }));
      }
    } catch (err) {
      console.error('GitHub API请求失败:', err);

      if (pageNum === 1) {
        setError(translate({
          id: 'download.error.fetchBuildsFailed',
          message: '无法获取构建数据。请检查网络连接或访问 GitHub Actions 页面查看最新构建。'
        }));
      }
    } finally {
      if (pageNum === 1) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBuilds(nextPage, true);
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error && builds.length === 0) {
    return <ErrorState error={error} />;
  }

  if (builds.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.buildGridContainer}>
      <div className={styles.releaseGrid}>
        {builds.map(build => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>

      {error && (
        <div className={styles.buildWarning}>
          <ErrorIcon className={styles.warningIcon} />
          <p>{error}</p>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <div className={styles.loadingSpinner}></div>
                <Translate>加载中...</Translate>
              </>
            ) : (
              <Translate>加载更多构建</Translate>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// 移动端开发版构建列表组件
function DevelopmentBuildList() {
  const [builds, setBuilds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBuilds = async (pageNum = 1, append = false) => {
    if (pageNum === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      // 获取构建信息
      const response = await fetch(`https://api.github.com/repos/iiabc/Invero/actions/runs?per_page=20&page=${pageNum}`);

      if (!response.ok) {
        throw new Error('获取GitHub Actions数据失败');
      }

      const data = await response.json();

      // 过滤出工作流名称包含"Plugin Build"的构建
      const pluginBuilds = data.workflow_runs
        .filter(run => run.name && run.name.includes('Plugin Build'))
        .slice(0, 10);

      // 获取每个构建的提交信息
      const buildsWithCommits = await Promise.all(
        pluginBuilds.map(async (run) => {
          let commitMessage = '获取提交信息失败';
          try {
            // 获取提交信息
            const commitResponse = await fetch(`https://api.github.com/repos/iiabc/Invero/commits/${run.head_sha}`);
            if (commitResponse.ok) {
              const commitData = await commitResponse.json();
              commitMessage = commitData.commit.message.split('\n')[0]; // 只取第一行

            }
          } catch (commitErr) {
            console.warn('获取提交信息失败:', commitErr);
          }

          return {
            id: run.id,
            name: run.name || `构建 #${run.run_number}`,
            number: run.run_number,
            branch: run.head_branch || 'unknown',
            date: new Date(run.created_at).toLocaleDateString(),
            status: run.conclusion || 'pending',
            downloadUrl: `https://github.com/iiabc/Invero/actions/runs/${run.id}`,
            commitMessage,
            commitSha: run.head_sha?.substring(0, 7) || 'unknown'
          };
        })
      );

      if (append) {
        setBuilds(prev => [...prev, ...buildsWithCommits]);
      } else {
        setBuilds(buildsWithCommits);
      }

      // 检查是否还有更多数据
      setHasMore(buildsWithCommits.length === 10);

      if (buildsWithCommits.length === 0 && pageNum === 1) {
        setError(translate({
          id: 'download.error.noBuildsFound',
          message: '未找到可用的构建。请访问 GitHub Actions 页面查看最新构建。'
        }));
      }
    } catch (err) {
      console.error('GitHub API请求失败:', err);

      if (pageNum === 1) {
        setError(translate({
          id: 'download.error.fetchBuildsFailed',
          message: '无法获取构建数据。请检查网络连接或访问 GitHub Actions 页面查看最新构建。'
        }));
      }
    } finally {
      if (pageNum === 1) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBuilds(nextPage, true);
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error && builds.length === 0) {
    return <ErrorState error={error} />;
  }

  if (builds.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.buildListContainer}>
      <div className={styles.releaseList}>
        {builds.map(build => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>

      {error && (
        <div className={styles.buildWarning}>
          <ErrorIcon className={styles.warningIcon} />
          <p>{error}</p>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <div className={styles.loadingSpinner}></div>
                <Translate>加载中...</Translate>
              </>
            ) : (
              <Translate>加载更多构建</Translate>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// 构建卡片组件，类似于ReleaseCard
function BuildCard({ build }) {
  return (
    <div className={styles.releaseCard}>
      <div className={styles.releaseHead}>
        <div className={styles.releaseDetails}>
          <div className={styles.releaseName}>
            {build.name} #{build.number}
          </div>
          <div className={styles.releaseInfo}>
            <div className={styles.releaseDate}>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.releaseDateIcon}>
                <path d="M6 5V1M14 5V1M5 9H15M19 7V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V7C1 5.89543 1.89543 5 3 5H17C18.1046 5 19 5.89543 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {build.date}
            </div>
            <div className={styles.buildBranch}>
              分支: {build.branch}
            </div>
            {build.status && (
              <div className={clsx(
                styles.buildStatus,
                build.status === 'success' ? styles.buildStatusSuccess :
                  build.status === 'failure' ? styles.buildStatusFailure :
                    styles.buildStatusPending
              )}>
                {build.status === 'success' ? '构建成功' :
                  build.status === 'failure' ? '构建失败' :
                    '进行中'}
              </div>
            )}
          </div>
        </div>
        <div className={styles.releaseActions}>
          <a
            href={build.downloadUrl}
            className={styles.viewDetailsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate>查看详情</Translate>
          </a>
        </div>
      </div>

      <div className={styles.releaseFiles}>
        <div className={styles.buildNote}>
          <div className={styles.buildNoteIcon}>
            <BuildIcon />
          </div>
          <div className={styles.buildNoteContent}>
            <div className={styles.buildNoteTitle}>
              <Translate>开发版构建</Translate>
            </div>
            <div className={styles.buildNoteDesc}>
              {build.commitMessage ? (
                <span>
                  <strong>{build.commitSha}</strong>: {build.commitMessage}
                </span>
              ) : (
                <Translate>包含最新代码更改，点击获取构建产物</Translate>
              )}
            </div>
          </div>
          <a
            href={build.downloadUrl}
            className={styles.buildDownloadButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadIcon className={styles.buildDownloadIcon} />
            <Translate>获取构建</Translate>
          </a>
        </div>
      </div>
    </div>
  );
}

function VersionToggle({ activeVersion, setActiveVersion }) {
  return (
    <div className={styles.versionToggle}>
      <button
        className={clsx(styles.versionButton, activeVersion === 'stable' && styles.activeVersion)}
        onClick={() => setActiveVersion('stable')}
      >
        <div className={styles.versionButtonContent}>
          <div className={styles.versionButtonIcon}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.7 7.1L10 13.8L3.3 7.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.versionText}>
            <Translate>稳定版</Translate>
          </div>
        </div>
      </button>
      <button
        className={clsx(styles.versionButton, activeVersion === 'preview' && styles.activeVersion)}
        onClick={() => setActiveVersion('preview')}
      >
        <div className={styles.versionButtonContent}>
          <div className={styles.versionButtonIcon}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5H16M4 9H16M4 13H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.versionText}>
            <Translate>预览版</Translate>
          </div>
        </div>
      </button>
      <button
        className={clsx(styles.versionButton, activeVersion === 'dev' && styles.activeVersion)}
        onClick={() => setActiveVersion('dev')}
      >
        <div className={styles.versionButtonContent}>
          <div className={styles.versionButtonIcon}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L13 7H17L13.5 10.5L15 16L10 13L5 16L6.5 10.5L3 7H7L10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.versionText}>
            <Translate>开发版构建</Translate>
          </div>
        </div>
      </button>
      <button
        className={clsx(styles.versionButton, activeVersion === 'all' && styles.activeVersion)}
        onClick={() => setActiveVersion('all')}
      >
        <div className={styles.versionButtonContent}>
          <div className={styles.versionButtonIcon}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V15C5 16.1046 5.89543 17 7 17H15C16.1046 17 17 16.1046 17 15V13M9 5V3C9 1.89543 9.89543 1 11 1H15C16.1046 1 17 1.89543 17 3V13M9 5H11C12.1046 5 13 5.89543 13 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.versionText}>
            <Translate>所有版本</Translate>
          </div>
        </div>
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}>
        <svg viewBox="0 0 50 50" className={styles.spinnerSvg}>
          <circle className={styles.spinnerPath} cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
        </svg>
      </div>
      <div className={styles.loadingText}>
        <Translate>正在获取版本信息...</Translate>
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorIcon}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className={styles.errorTitle}>
        <Translate>获取版本信息失败</Translate>
      </h3>
      <p className={styles.errorMessage}>{error}</p>
      <div className={styles.errorAction}>
        <a
          href="https://github.com/iiabc/Invero/releases"
          className={styles.actionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Translate>前往 GitHub Releases 页面</Translate>
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.actionButtonIcon}>
            <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" strokeWidth="2" />
          <path d="M9 9H9.01M15 9H15.01M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className={styles.emptyTitle}>
        <Translate>暂无可用版本</Translate>
      </h3>
      <p className={styles.emptyDescription}>
        <Translate>
          当前分类下没有可用的版本发布，请尝试查看其他分类或访问 GitHub 仓库获取最新信息。
        </Translate>
      </p>
      <div className={styles.emptyAction}>
        <a
          href="https://github.com/iiabc/Invero"
          className={styles.actionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Translate>访问 GitHub 仓库</Translate>
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.actionButtonIcon}>
            <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// 移动端下载内容区域
function MobileDownloadContent({ activeVersion, setActiveVersion, releases, isLoading, error }) {
  // 筛选版本
  const filteredReleases = releases.filter(release => {
    if (activeVersion === 'all') return true;
    if (activeVersion === 'stable') return !release.prerelease;
    if (activeVersion === 'preview') return release.prerelease;
    if (activeVersion === 'dev') return false; // 开发版构建不显示release列表
    return true;
  });

  return (
    <section style={{ padding: '2rem 1rem', background: 'var(--ifm-background-surface-color)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className={styles.cardsHeader}>
          <h3 className={styles.cardsTitle}>
            <Translate>版本发布</Translate>
          </h3>
          <div className={styles.cardsTitleLine}></div>
        </div>

        <VersionToggle
          activeVersion={activeVersion}
          setActiveVersion={setActiveVersion}
        />

        {activeVersion === 'stable' && (
          <p className={styles.versionDescription}>
            <Translate>稳定版本经过全面测试，适合用于生产环境</Translate>
          </p>
        )}
        {activeVersion === 'preview' && (
          <p className={styles.versionDescription}>
            <Translate>预览版本包含最新功能，但可能存在稳定性问题</Translate>
          </p>
        )}
        {activeVersion === 'dev' && (
          <p className={styles.versionDescription}>
            <Translate>开发版构建包含最新的代码更改，适合开发者测试新功能</Translate>
          </p>
        )}
        {activeVersion === 'all' && (
          <p className={styles.versionDescription}>
            <Translate>查看所有可用的版本，包括稳定版和预览版</Translate>
          </p>
        )}

        {activeVersion === 'dev' ? (
          <DevelopmentBuildList />
        ) : isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
        ) : filteredReleases.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={styles.releaseList}>
            {filteredReleases.map(release => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// 响应式Hero组件
function ResponsiveHeroSection({ activeVersion, setActiveVersion, releases, isLoading, error }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        <MobileHeroSection />
        <MobileDownloadContent
          activeVersion={activeVersion}
          setActiveVersion={setActiveVersion}
          releases={releases}
          isLoading={isLoading}
          error={error}
        />
      </>
    );
  }

  return (
    <DesktopHeroSection
      activeVersion={activeVersion}
      setActiveVersion={setActiveVersion}
      releases={releases}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default function DownloadPage() {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVersion, setActiveVersion] = useState('stable');

  useEffect(() => {
    // GitHub API 请求获取 releases
    fetch('https://api.github.com/repos/iiabc/Invero/releases')
      .then(response => {
        if (!response.ok) {
          throw new Error(translate({
            id: 'download.error.githubApiFailed',
            message: 'GitHub API 请求失败: {status}',
          }, { status: response.status }));
        }
        return response.json();
      })
      .then(data => {
        setReleases(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('获取 releases 失败:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout
      title={translate({
        id: 'page.download.title',
        message: '下载 Invero',
      })}
      description={translate({
        id: 'page.download.description',
        message: '下载 Invero Minecraft GUI 插件的最新版本',
      })}>

      <ResponsiveHeroSection
        activeVersion={activeVersion}
        setActiveVersion={setActiveVersion}
        releases={releases}
        isLoading={isLoading}
        error={error}
      />
    </Layout>
  );
}