project(NitroMath)
cmake_minimum_required(VERSION 3.9.0)

set (PACKAGE_NAME NitroMath)
set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 20)

# Define C++ library and add all sources
add_library(
        ${PACKAGE_NAME} 
        SHARED
        src/main/cpp/cpp-adapter.cpp
        ../cpp/HybridMath.cpp
        ../cpp/utils.c
)

# Add Nitrogen specs :)
include(${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/NitroMath+autolinking.cmake)

# Set up local includes
include_directories(
        "src/main/cpp"
        "../cpp"
)

find_library(LOG_LIB log)

# Uncomment to get with_set_target_properties.log error
# set_target_properties(${PACKAGE_NAME} PROPERTIES
#     LINK_FLAGS "-Wl,--hash-style=both"
# )

# Link all libraries together
target_link_libraries(
        ${PACKAGE_NAME}
        ${LOG_LIB}
        android
        -lm
)