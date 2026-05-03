"use client";

import { useEffect, useState } from "react";
import { X, Play, AlertCircle, Youtube } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseURL}/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const openVideoModal = (videoUrl, title) => {
    setActiveVideo(videoUrl);
    setVideoTitle(title);
    setVideoError(false);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
    setVideoTitle("");
    setVideoError(false);
  };

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  const getEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gymora <span className="text-blue-600">Blogs</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover fitness tips, workout guides, and expert advice from our fitness community
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* BLOG GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map(blog => {
                const videoId = getYouTubeVideoId(blog.videoUrl);
                const embedUrl = getEmbedUrl(blog.videoUrl);
                const hasVideo = !!videoId;
                const thumbnailUrl = blog.image || 
                  (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null);
                
                return (
                  <div
                    key={blog._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* IMAGE or VIDEO THUMBNAIL */}
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      {thumbnailUrl ? (
                        <div 
                          className={`w-full h-full cursor-pointer ${hasVideo ? 'relative' : ''}`}
                          onClick={() => hasVideo && openVideoModal(blog.videoUrl, blog.title)}
                        >
                          <img
                            src={thumbnailUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {/* Play Button Overlay for videos */}
                          {hasVideo && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <Play className="w-8 h-8 text-white ml-1" />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-lg">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h2 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {blog.description}
                      </p>

                      <p className="text-gray-700 mb-6 line-clamp-3 text-sm">
                        {blog.content}
                      </p>

                      {/* Watch Video Button if video exists */}
                      {hasVideo && (
                        <button
                          onClick={() => openVideoModal(blog.videoUrl, blog.title)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:gap-3 transition-all duration-300"
                        >
                          <Youtube className="w-4 h-4" />
                          Watch on YouTube
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {blogs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No blogs yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Blogs will appear here once they are published. Check back soon!
                </p>
              </div>
            )}
          </>
        )}

        {/* VIDEO MODAL */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900 truncate pr-10">
                  {videoTitle}
                </h3>
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Video Player */}
              {!videoError ? (
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={getEmbedUrl(activeVideo)}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video player"
                    onError={handleVideoError}
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                  />
                </div>
              ) : (
                <div className="py-20 text-center">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Could not load video
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    The video cannot be played here due to browser restrictions.
                  </p>
                  {getYouTubeVideoId(activeVideo) && (
                    <a
                      href={activeVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                      Watch on YouTube
                    </a>
                  )}
                </div>
              )}

              {/* Modal Footer */}
              <div className="p-4 md:p-6 border-t">
                <div className="flex justify-between items-center">
                  {!videoError ? (
                    <>
                      <span className="text-sm text-gray-500">
                        YouTube Video Player
                      </span>
                      <button
                        onClick={closeVideoModal}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
                      >
                        Close
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      You can watch this video directly on YouTube
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
